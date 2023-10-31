# TBD Developer Website Feedback Server

Simple node server to compute the developer.tbd.website up & down votes from 
the Feedback Widget located at the bottom of the `/docs` pages.

## Instructions for local execution and development

```sh
cp .env.example .env

# modify the .env variables as you prefer, there's no need for setting
# a DB connection because we fallback to a in-memory mocked fake db for
# tests purposes

pnpm dev
```

The server should be ready to support the local docusaurus Helpful/Not Helpful button clicks.

By default, if you don't set up a PostgresDB connection in the config, it will be running with
an in-memory fake database (aka just an array 😝).

### Testing

1. Run the server with `pnpm dev`
1. Set the `FEEDBACK_WIDGET_API_URL=http://localhost:3001/api` on the `./site` environment variables:
    ```sh
    cd ../..
    cp site/.env.example site/.env

    # edit the site/.env uncommenting the FEEDBACK_WIDGET_API_URL and setting the parameter as below
    FEEDBACK_WIDGET_API_URL=http://localhost:3001/api
    ```
1. Run `pnpm start` to initialize the website
1. Open any docs page such as http://localhost:3000/docs/web5/quickstart
1. Scroll to the bottom and press the `Helpful` or `Not Helpful` button to vote
1. Check in your terminal that the vote is being inserted and the Total Votes log is being increased
1. Also check your network requests in the browser are healthy

PS: If you change your server secret, the CSRF token will need a refresh, so you will need to clear 
your browser cookies. (Inspect > Application tab > Storage > Select all storage options, including 
Cookies and 3rd party ones > Clear site data)

By now you have validated that the server application is running and computing votes properly. If 
you want to go further and do fun DB tests, you can play with docker and run queries as suggested 
at the end of this doc. 

## Instructions for running it in prod

```sh
# this is raw nodejs, just run with a proper DB connection set and make sure you have a good 
# api waf / rate limiter in place
pnpm start
```

## Running on Docker locally with a Real DB

```sh
# build the container, from the repo root
cd ../..
docker build -f Apps.Dockerfile . --target feedback-server-app --tag feedback-server-app:latest

# run the container with the default postgres from the root folder
cd ../..
docker compose up -d
```

### Querying

After voting on a couple of pages, use your favorite DB Client (tip: SQLTools on VSCode) to
query for the voting data.

Your connection settings will be exactly what you set for your database. Say you are using 
our docker compose above, this will be your connection settings:

- Address: localhost
- Port: 5432
- User: feedback_user
- Password: feedback_pass
- Database: feedback_widget

This should work in any Postgres client, including psql! We are using two extensions in VSCode:

- [SQLTools](https://marketplace.visualstudio.com/items?itemName=mtxr.sqltools)
- [SQLTools PostgreSQL/Cockroach Driver](https://marketplace.visualstudio.com/items?itemName=mtxr.sqltools-driver-pg)

After installing both extensions and reloading your editor, just click on the SQLTools Icon on 
the left menu > Add New Connection > Postgres > fill the information above > then press Test 
Connection and everything should work. Just run the following queries after submitting a few 
votes through the local website.

```sql
-- select the most recent 100 votes
SELECT *
  FROM feedback_votes
 ORDER BY created_at DESC
 LIMIT 100; 

-- summarize the last month votes per page
SELECT 
    url,
    COUNT(*) AS total_votes,
    SUM(CASE WHEN vote = 'Y' THEN 1 ELSE 0 END) AS helpful_votes,
    SUM(CASE WHEN vote = 'N' THEN 1 ELSE 0 END) AS not_helpful_votes,
    ROUND(
        (SUM(CASE WHEN vote = 'N' THEN 1 ELSE 0 END)::FLOAT / COUNT(*)::FLOAT) * 100
    ) AS not_helpful_percentage
FROM feedback_votes 
WHERE created_at >= NOW() - INTERVAL '1 MONTH'
GROUP BY url 
ORDER BY url;
```
