# TBD Developer Website Feedback Server

Simple node server to compute the developer.tbd.website up & down votes.

## Instructions for local execution and development

```sh
cp .env.example .env

# adjust env variables on the .env file
# you will need a Google API Key with access to Spreadsheets

pnpm dev
```

The server should be ready to support the local docusaurus Helpful/Not Helpful button clicks.

## Instructions for running it in prod

```sh
# this is raw nodejs, just run:
pnpm start
```

## Running docker locally

```sh
# build the container, from the repo root
cd ../..
docker build -f Apps.Dockerfile . --target feedback-server-app --tag feedback-server-app:latest

# run the container
docker run -dp 127.0.0.1:3001:3001 feedback-server-app:latest
```