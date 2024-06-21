# TBD Developer Site

[![Netlify Status](https://api.netlify.com/api/v1/badges/19baaad3-74aa-4443-8638-43f89fc55926/deploy-status)](https://app.netlify.com/sites/tbd-website-developer/deploys)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/TBD54566975/developer.tbd.website/badge)](https://securityscorecards.dev/viewer/?uri=github.com/TBD54566975/developer.tbd.website)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FTBD54566975%2Fdeveloper.tbd.website.svg?type=shield&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2FTBD54566975%2Fdeveloper.tbd.website?ref=badge_shield&issueType=license)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FTBD54566975%2Fdeveloper.tbd.website.svg?type=shield&issueType=security)](https://app.fossa.com/projects/git%2Bgithub.com%2FTBD54566975%2Fdeveloper.tbd.website?ref=badge_shield&issueType=security)

This is the source for `developer.tbd.website` 
and its supporting services and testsuites. It 
is structured as a monorepo powered by 
[pnpm](https://pnpm.io/) that includes a 
documentation site, tutorials and examples. 
This layout allows you to conveniently 
manage multiple projects within a single repository.

The site is implemented in 
[Docusaurus](https://docusaurus.io/docs), a static 
site generator based on 
[React](https://react.dev/) with the purpose 
of helping you build quality documentation 
sites for your products quickly.

## Prerequisites

Before you begin, ensure that you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (version 18.16.0 or later)
- [pnpm](https://pnpm.io/) (version 7.29.1 or later)
- [Java Development Kit](https://en.wikipedia.org/wiki/Java_Development_Kit) (version 17, recommended via [SDKMan](https://sdkman.io/install), as described below)
- [Xcode](https://developer.apple.com/xcode/) (Version 15, **optional**, needed to run Swift tests locally)
- [Rust](https://www.rust-lang.org/tools/install) (Version 1.75.0, **optional**, needed to run Rust tests locally)

### Node Installation

We recommend installing Node via the `nvm` 
[Node Version Manager](https://github.com/nvm-sh/nvm).
Once installed on your system, you can get Node:

```shell
$> nvm install v18.16.0
...
$> nvm use v18.16.0
Now using node v18.16.0 (npm v9.5.1)
```

You should now see both `node` and `npm` available from your `$PATH`:

```
$> node --version
v18.16.0
$> npm --version
9.5.1
```

Note: if you already have `node` `v18.16.0` installed, you can switch to use it using `nvm use`; this will automatically 
set your `node` version to the one defined in `.nvmrc` in the root of this repo.

### PNPM Installation

To install `pnpm` globally on your local machine, follow these steps:

1. Open a terminal or command prompt.
2. Run the following command:

```shell
npm install -g pnpm
```

3. Wait for the installation process to complete.

> Note: If you already have `pnpm` installed globally, you can skip this step.

### Java Development Kit

This project has components written in [Kotlin](https://kotlinlang.org/), a concise
programming language from JetBrains that runs on the Java Virtual Machine.

To build the site including its testsuite, you must have
a Java Development Kit installed on your `$PATH`.

You may verify your `java` installation via the terminal by running `java -version`.

If you do not have Java, we recommend installing it
via [SDKMan](https://sdkman.io/install). This is a project which will allow you
to easily install the Java Development Kit (JDK), runtime (JRE), and related frameworks,
build tools, and runtimes.

After you've installed SDKMan, you may install Java:

#### SDKMan (cross-platform instructions)

```shell
$> sdk install java 17.0.10-oracle 
 ...
Do you want java 17.0.10-oracle to be set as default? (Y/n): Y
Setting java 17.0.10-oracle as default.
```

You may test your installation:

```shell
$> java -version
java version "17.0.10" 2024-01-16 LTS
Java(TM) SE Runtime Environment (build 17.0.10+11-LTS-240)
Java HotSpot(TM) 64-Bit Server VM (build 17.0.10+11-LTS-240, mixed mode, sharing)
```

### Playwright Installation

[Playwright](https://playwright.dev/) is the 
test harness we use for browser-based examples. 
It can be installed from the root of this repo:

```shell
developer.tbd.website $> pnpm playwright install --with-deps
```

Note: Running `pnpm i` is first required before running the playwright install command above.

This is required when running the tests, for instance via `pnpm test`.

Note: At time of this writing, Playwright is [not supported on Fedora systems](https://github.com/microsoft/playwright/issues/29559).

### XCode Installation

[XCode](https://developer.apple.com/xcode/) is Apple's development toolkit, and is used for both IDE and runtime for Swift examples. Install via the site link for your platform.

You can test your installation:

```
$> swift --version
swift-driver version: 1.87.3 Apple Swift version 5.9.2 (swiftlang-5.9.2.2.56 clang-1500.1.0.2.5)
Target: arm64-apple-macosx14.0
```

This optional prereq is required only when running the `pnpm test:swift` command. Once Swift tests are in place, we'll add the Swift environment to the `pnpm test` lifecycle and this will be a required prereq.

### Rust Installation

[Rust](https://www.rust-lang.org/tools/install) is a modern typesafe, compiled, performant language. Install via the site link for your platform.

You may test your installation:

```
$> rustc --version
rustc 1.75.0 (82e1608df 2023-12-21)
```
This optional prereq is required only when running the `pnpm test:rust` command. Once Rust tests are in place, we'll add the Rust environment to the `pnpm test` lifecycle and this will be a required prereq.

## Running online environment
Interested in contributing instantly? You can make your updates directly without cloning in the running CodeSandbox environment.

[![Button to edit in CodeSandbox environment](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/github/TBD54566975/developer.tbd.website/main)

## Getting Started

To get started with the monorepo and run the available scripts, follow these instructions:

1. Fork the repository into your namespace 
using the
["Fork" button on GitHub](https://github.com/TBD54566975/developer.tbd.website).

2. Clone into your local workspace. Replace 
`$yourUsernameOrOrg` with your GitHub username 
or org.

```shell
$> git clone https://github.com/$yourUsernameOrOrg/developer.tbd.website.git
```

3. Navigate to the project directory:

```shell
$> cd developer.tbd.website
```

4. Install project dependencies using `pnpm`:

```shell
$> pnpm install
```

5. Once the installation is complete, you are ready to run the available scripts.

## Scripts

The following scripts are available for running specific tasks within the monorepo:

- `pnpm start`: Runs the docs site for auto-refresh in development mode
- `pnpm start:tutorial-todo-starter`: Starts the local server for the todo app tutorial
- `pnpm start:tutorial-todo-completed`: Starts the local server for the completed todo app
- `pnpm start:widget`: Runs the completed web5 widget
- `pnpm clear`: Runs docusaurus clear
- `pnpm build`: Runs the production build for the site so it can be hosted by a static web server. The completed build will be in the folder `site/build`.
- `pnpm test`: Runs the testsuites for the site and all examples in JS, Kotlin, Swift, including browser tests. Requires Playwright, Java Development Kit, and Swift, per installation instructions above.
- `pnpm test:apps`: Runs the Applications testsuite only.
- `pnpm test:js`: Runs the JavaScript testsuite only.
- `pnpm test:js myFile.test.js`: Runs the tests within `myFile.test.js` only.
- `pnpm test:kotlin`: Runs the Kotlin testsuite only.
- `pnpm test:rust`: Runs the Rust testsuite. Not included in the `pnpm test` lifecycle yet, only runs directly through this script.
- `pnpm test:swift`: Runs the Swift testsuite. Not included in the `pnpm test` lifecycle yet, only runs directly through this script.

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
