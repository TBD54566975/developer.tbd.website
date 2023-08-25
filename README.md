# TBD Developer Site
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

This is a monorepo powered by [pnpm](https://pnpm.io/) that includes a documentation site, tutorials and examples. This repository allows you to conveniently manage multiple projects within a single repository.

## Prerequisites

Before you begin, ensure that you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (version 18.16.0 or later)
- [pnpm](https://pnpm.io/) (version 7.29.1 or later)

## Installation

To install `pnpm` globally on your local machine, follow these steps:

1. Open a terminal or command prompt.
2. Run the following command:

```shell
npm install -g pnpm
```

3. Wait for the installation process to complete.

> Note: If you already have `pnpm` installed globally, you can skip this step.

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/yuusufoladipo"><img src="https://avatars.githubusercontent.com/u/77832856?v=4?s=100" width="100px;" alt="Yuusuf Oyelola Oladipo"/><br /><sub><b>Yuusuf Oyelola Oladipo</b></sub></a><br /><a href="#content-Civil-captain" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/nearlyjuly"><img src="https://avatars.githubusercontent.com/u/112702586?v=4?s=100" width="100px;" alt="nearlyjuly"/><br /><sub><b>nearlyjuly</b></sub></a><br /><a href="https://github.com/TBD54566975/developer.tbd.website/commits?author=nearlyjuly" title="Code">💻</a> <a href="#question-nearlyjuly" title="Answering Questions">💬</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Prod1gy0ne"><img src="https://avatars.githubusercontent.com/u/96172348?v=4?s=100" width="100px;" alt="Prod1gy0ne"/><br /><sub><b>Prod1gy0ne</b></sub></a><br /><a href="https://github.com/TBD54566975/developer.tbd.website/commits?author=Prod1gy0ne" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!