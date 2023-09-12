# TBD Developer Site

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

## 🎉 **We're participating in Hacktoberfest 2023!** 🎉

Want to contribute during Hacktoberfest? We'd love to have you! Dive in, and your contributions could earn you some exclusive rewards. The first 10 merged PRs will secure TBD bucks, redeemable for exclusive swag at our [TBD shop](https://www.tbd.shop/s/shop). Keep an eye on our [leaderboard issue]() to see where you rank!

## **Hacktoberfest Guidelines:**

- Ensure your contribution is meaningful and fits within the scope of our project.
- Check out our `good-first-issue` and `hacktoberfest` labels in the issues section.
- Join our Discord: Connect with the community, stay up to date with Hacktoberfest events/prizes, and discuss Hacktoberfest contributions on our Discord server. Click [here](https://discord.com/channels/937858703112155166/1151216855957123104) to join.
- Always be respectful and follow our [code of conduct](https://developer.tbd.website/open-source/code-of-conduct).
- If in doubt about what to contribute, reach out to maintainers by raise a question in the relevant issue.
- **Other participating TBD Repo's:**
  - [DWN-Server](https://github.com/TBD54566975/dwn-server/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)
  - [DWN-SDK-JS](https://github.com/TBD54566975/dwn-sdk-js/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)
  - [Web5-js](https://github.com/TBD54566975/web5-js/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)

## **What is Hacktoberfest?**

Celebrate the 10th anniversary of Hacktoberfest this year! Hosted annually every October, Hacktoberfest is a month-long event sponsored by DigitalOcean, GitHub, and various other partners, championing open-source contributions. This milestone year introduces exciting digital prizes:

- Digital Reward Kit:
  - A dynamic badge that evolves with every pull/merge request that maintainers accept.
  - Distinctive achievement badges.
  - Surprise gifts from the event sponsors
- Plant a Tree:
  - For the environment-conscious, rejoice! The first 50,000 participants with merged PRs/MRs will have a tree planted in their honor.

If you're new to Hacktoberfest, you can learn more and register to participate [here](https://hacktoberfest.com/participation/).

## Prerequisites

This is a monorepo powered by [pnpm](https://pnpm.io/) that includes a documentation site, tutorials and examples. This repository allows you to conveniently manage multiple projects within a single repository.

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
      <td align="center" valign="top" width="14.28%"><a href="http://aguywhocodes.com"><img src="https://avatars.githubusercontent.com/u/13209683?v=4?s=100" width="100px;" alt="Michael Brown"/><br /><sub><b>Michael Brown</b></sub></a><br /><a href="https://github.com/TBD54566975/developer.tbd.website/commits?author=aguywithcode" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/nearlyjuly"><img src="https://avatars.githubusercontent.com/u/112702586?v=4?s=100" width="100px;" alt="nearlyjuly"/><br /><sub><b>nearlyjuly</b></sub></a><br /><a href="https://github.com/TBD54566975/developer.tbd.website/commits?author=nearlyjuly" title="Code">💻</a> <a href="#question-nearlyjuly" title="Answering Questions">💬</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Prod1gy0ne"><img src="https://avatars.githubusercontent.com/u/96172348?v=4?s=100" width="100px;" alt="Prod1gy0ne"/><br /><sub><b>Prod1gy0ne</b></sub></a><br /><a href="https://github.com/TBD54566975/developer.tbd.website/commits?author=Prod1gy0ne" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/andorsk"><img src="https://avatars.githubusercontent.com/u/8604639?v=4?s=100" width="100px;" alt="Andor Kesselman"/><br /><sub><b>Andor Kesselman</b></sub></a><br /><a href="https://github.com/TBD54566975/developer.tbd.website/commits?author=andorsk" title="Code">💻</a> <a href="https://github.com/TBD54566975/developer.tbd.website/commits?author=andorsk" title="Documentation">📖</a> <a href="#example-andorsk" title="Examples">💡</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/adityakode"><img src="https://avatars.githubusercontent.com/u/105551807?v=4?s=100" width="100px;" alt="Aditya Kode"/><br /><sub><b>Aditya Kode</b></sub></a><br /><a href="https://github.com/TBD54566975/developer.tbd.website/commits?author=adityakode" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://jsahagun.io/"><img src="https://avatars.githubusercontent.com/u/34168252?v=4?s=100" width="100px;" alt="Jose Sahagun"/><br /><sub><b>Jose Sahagun</b></sub></a><br /><a href="https://github.com/TBD54566975/developer.tbd.website/commits?author=jsahagun91" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mathieurivest"><img src="https://avatars.githubusercontent.com/u/4664198?v=4?s=100" width="100px;" alt="Mathieu Rivest"/><br /><sub><b>Mathieu Rivest</b></sub></a><br /><a href="https://github.com/TBD54566975/developer.tbd.website/commits?author=mathieurivest" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/shoito"><img src="https://avatars.githubusercontent.com/u/37051?v=4?s=100" width="100px;" alt="shoito"/><br /><sub><b>shoito</b></sub></a><br /><a href="https://github.com/TBD54566975/developer.tbd.website/commits?author=shoito" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sarathcodes"><img src="https://avatars.githubusercontent.com/u/58284608?v=4?s=100" width="100px;" alt="Sarah Nair"/><br /><sub><b>Sarah Nair</b></sub></a><br /><a href="https://github.com/TBD54566975/developer.tbd.website/commits?author=sarathcodes" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.acekyd.com"><img src="https://avatars.githubusercontent.com/u/4003538?v=4?s=100" width="100px;" alt="Adewale Abati"/><br /><sub><b>Adewale Abati</b></sub></a><br /><a href="https://github.com/TBD54566975/developer.tbd.website/commits?author=acekyd" title="Code">💻</a> <a href="#content-acekyd" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/alec-brooks"><img src="https://avatars.githubusercontent.com/u/1539341?v=4?s=100" width="100px;" alt="alec-brooks"/><br /><sub><b>alec-brooks</b></sub></a><br /><a href="https://github.com/TBD54566975/developer.tbd.website/commits?author=alec-brooks" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
