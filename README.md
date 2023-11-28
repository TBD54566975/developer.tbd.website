# TBD Developer Site

[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/TBD54566975/developer.tbd.website/badge)](https://securityscorecards.dev/viewer/?uri=github.com/TBD54566975/developer.tbd.website)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FTBD54566975%2Fdeveloper.tbd.website.svg?type=shield&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2FTBD54566975%2Fdeveloper.tbd.website?ref=badge_shield&issueType=license)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FTBD54566975%2Fdeveloper.tbd.website.svg?type=shield&issueType=security)](https://app.fossa.com/projects/git%2Bgithub.com%2FTBD54566975%2Fdeveloper.tbd.website?ref=badge_shield&issueType=security)

## Prerequisites

This is a monorepo powered by [pnpm](https://pnpm.io/) that includes a documentation site, tutorials and examples. This repository allows you to conveniently manage multiple projects within a single repository.

Before you begin, ensure that you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (version 18.16.0 or later)
- [pnpm](https://pnpm.io/) (version 7.29.1 or later)

### PNPM Installation

To install `pnpm` globally on your local machine, follow these steps:

1. Open a terminal or command prompt.
2. Run the following command:

```shell
npm install -g pnpm
```

3. Wait for the installation process to complete.

> Note: If you already have `pnpm` installed globally, you can skip this step.

### Playwright Installation

[Playwright](https://playwright.dev/) is the test harness we use for browser-based examples. It can be installed:

```shell
pnpm playwright install --with-deps
```

This is required when running the tests, for instance via `pnpm test`.

## Running online environment
Interested in contributing instantly? You can make your updates directly without cloning in the running CodeSandbox environment.

[![Button to edit in CodeSandbox environment](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/github/TBD54566975/developer.tbd.website/main)


## Getting Started

To get started with the monorepo and run the available scripts, follow these instructions:

1. Clone the repository:

```shell
git clone https://github.com/TBD54566975/developer.tbd.website.git
```

2. Navigate to the project directory:

```shell
cd developer.tbd.website
```

3. Install project dependencies using `pnpm`:

```shell
pnpm install
```

4. Once the installation is complete, you are ready to run the available scripts.

## Scripts

The following scripts are available for running specific tasks within the monorepo:

- `pnpm start`: Runs the docs site for auto-refresh in development mode
- `pnpm start:tutorial-todo-starter`: Starts the local server for the todo app tutorial
- `pnpm start:tutorial-todo-completed`: Starts the local server for the completed todo app
- `pnpm start:widget`: Runs the completed web5 widget
- `pnpm clear`: Runs docusaurus clear
- `pnpm build`: Runs the production build for the site so it can be hosted by a static web server. The completed build will be in the folder `site/build`.
- `pnpm test`: Runs the testsuites for the site and all examples, including browser tests. Requires Playwright, per installation instructions above.

## Extra Features

We have implemented extra features in the website that don't come turned on by default, as an example we have the Feedback Widget feature, which allows an user to upvote or downvote a docs page. 

These features are enabled from environment variables set in the file .env, inside the site folder. To enable them, copy the example .env file:

```sh
cp site/.env.example site/.env
```

And modify the parameters accordingly to the feature you want to play with! Check their instructions below:

- `FEEDBACK_WIDGET_API_URL`: enables feedback widget api url; [Feedback server app instructions](./apps/feedback-server/README.md)
- `DOC_SEARCH_*`: enables the search bar powered by Algolia; [Algolia connecting instructions](https://docusaurus.io/docs/search#connecting-algolia)

Remember, when these environment variables are not set these features are disabled by default.

### Note

This repo made a switch from using `npm` to `pnpm` as the package manager in July 2023. If you have used prior versions of this repo built on your machine with `npm`, you may encounter build failures, like:

```
[ERROR] Unable to build website for locale en.
[ERROR] Error: Cannot mix different versions of joi schemas
    at new module.exports (/Users/alr/git/TBD54566975/developer.tbd.website/site/node_modules/@hapi/hoek/lib/error.js:23:19)
    at module.exports (/Users/alr/git/TBD54566975/developer.tbd.website/site/node_modules/@hapi/hoek/lib/assert.js:21:11)
    at exports.isSchema (/Users/alr/git/TBD54566975/developer.tbd.website/site/node_modules/joi/lib/common.js:132:5)
    at internals.schema (/Users/alr/git/TBD54566975/developer.tbd.website/site/node_modules/joi/lib/compile.js:66:16)
    at exports.schema (/Users/alr/git/TBD54566975/developer.tbd.website/site/node_modules/joi/lib/compile.js:17:26)
    at internals.Base.$_compile (/Users/alr/git/TBD54566975/developer.tbd.website/site/node_modules/joi/lib/base.js:646:24)
    at /Users/alr/git/TBD54566975/developer.tbd.website/site/node_modules/joi/lib/types/keys.js:262:92
    at exports.tryWithPath (/Users/alr/git/TBD54566975/developer.tbd.website/site/node_modules/joi/lib/common.js:176:16)
    at internals.Base.method [as keys] (/Users/alr/git/TBD54566975/developer.tbd.website/site/node_modules/joi/lib/types/keys.js:262:32)
    at internals.Base.method [as append] (/Users/alr/git/TBD54566975/developer.tbd.website/site/node_modules/joi/lib/types/keys.js:191:29)
```

To fix this, clear out all instances of `node_modules` in this monorepo, then run `pnpm install`. This can be done like:

```
$> npx npkill
[Follow prompts to delete all node_modules folders]
[CNTL-C to exit]
$> pnpm install
```

This will update your dependences to the mechanism used by `pnpm`.

## Running commands

If for whatever reason, you'd like to run pnpm commands on specific packages only, use the `--filter` flag and refer to the package name of the project.

Filter docs: https://pnpm.io/filtering

For example, if you wanted to add a library to the docs site itself:

`pnpm --filter docs add some-library`

If you look at the package.json under the path: `/site/package.json`, you'll see the "name" attribute says "docs", which is what we're using to target.

## Contributing

If you wish to contribute to this project, please follow the guidelines outlined in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is licensed under the [MIT License](LICENSE).
