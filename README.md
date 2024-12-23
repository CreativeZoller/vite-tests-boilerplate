# Vite boilerplate with testing tools

![GitHub issues](https://img.shields.io/github/issues-raw/CreativeZoller/vite-tests-boilerplate?logo=issues)
![GitHub Issues or Pull Requests](https://img.shields.io/github/issues-pr-raw/CreativeZoller/vite-tests-boilerplate)
![GitHub last commit](https://img.shields.io/github/last-commit/CreativeZoller/vite-tests-boilerplate?logo=last%20commit)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/CreativeZoller/vite-tests-boilerplate)
![GitHub License](https://img.shields.io/github/license/CreativeZoller/vite-tests-boilerplate)

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [License](#license)

![running app in chrome browser][screenshot]

## Description

This is a template, a boilerplate for modern Vite projects. You can use it as you want, both as dependency or as a brand-new base.

### Commands cheat-sheet for newcomers

For those who used npm till now, I would suggest to change to Yarn immediately. Here is a cheat-sheet for commands in both package manager:

| Command                  | NPM                                  | Yarn                           |
| ------------------------ | ------------------------------------ | ------------------------------ |
| Install dependencies     | `npm install`                        | `yarn`                         |
| Install package          | `npm install [package]`              | `yarn add [package]`           |
| Install Dev package      | `npm install --save-dev [package]`   | `yarn add --dev [package]`     |
| Uninstall package        | `npm uninstall [package]`            | `yarn remove [package]`        |
| Uninstall Dev package    | `npm uninstall --save-dev [package]` | `yarn remove [package]`        |
| Update                   | `npm update`                         | `yarn upgrade`                 |
| Update package           | `npm update [package]`               | `yarn upgrade [package]`       |
| Global install package   | `npm install --global [package]`     | `yarn global add [package]`    |
| Global uninstall package | `npm uninstall --global [package]`   | `yarn global remove [package]` |

| NPM                      | Yarn                      |
| ------------------------ | ------------------------- |
| `npm init`               | `yarn init`               |
| `npm run`                | `yarn run`                |
| `npm login (and logout)` | `yarn login (and logout)` |
| `npm link`               | `yarn link`               |
| `npm publish`            | `yarn publish`            |
| `npm cache clean`        | `yarn cache clean`        |

### Version

Version number: 2.0.0

#### Changelog

Version number: 2.0.0

The project got updated for a drag 'n' drop Christmas Gift list application in the spirit of the upcoming festives.

The project got updated with the following changes:

- styling replaced with [Tailwind](https://tailwindcss.com/) in order to make the styling process easier to modify

- [drag and drop](https://github.com/hello-pangea/dnd#readme) functionality added to our new single list, so now we have a true application structure

- [xls export](https://sheetjs.com/) option added for the list export, so you can style it in Excel and print out, after finished with the proper Gift List

- with the changes, new unit and e2e tests are also implemented instead of the old ones

- also a lot of (from my pov) unnecessary stuff is now removed, reducing the repo size, the build size, and just not including all not used code

Version number: 1.0.0

This project was generated with the following stack:

- [Vite 5](https://vitejs.dev/guide/)
- [React18](https://react.docschina.org/)
- [React Router dom 6](https://reactrouter.com/en/main)
- [zustand](https://github.com/pmndrs/zustand): Popular React State Management Solution.
- Active Eslint, prettier, husky, stylelint, etc.

#### Features

- standard Vite project blueprint
- additional linting, Prettier and Husky for proper linting and formatting of the codebase
- additional unit and e2e testing added with coverage tool (Vitest, Cypress)

## Installation

Clone this repository to your hard drive.

The repository requires Yarn 2 to be installed, which can be done as fresh install or migration from Yarn 1, for instructions please follow [the following documentation](https://yarnpkg.com/migration/guide).

With Yarn 2 the husky install and hook creation is simply and automatic, you only need to run the following command for installation: `yarn dlx husky-init --yarn2 && yarn`. After successfull installation, you can create hook by simply sunning: `npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'`. with this, the hook wants to run `npm test` which we don't have obviously, so change it to `yarn lint && yarn format`.

| :warning: WARNING                                                                                               |
| :-------------------------------------------------------------------------------------------------------------- |
| If the automatically generated hook already in this repo before the installation, do NOT run the above commands |

To install all the dependencies, execute this command: `yarn install`

Running the development sever: `yarn dev`

Building for test mode: `yarn build:test`

Building for production mode: `yarn build`

Note: Environment variable file (env) has been added to the root directory, so you can add custom commands to the environment files according to your project needs.

> If you want to use this repository as a base, please remove the git configuration, so you can set it up for your own project.

## Usage

Clone this repository to your hard drive, to start using it as boilerplate for your own project. Feel free to remove the git configurations, if not using as development dependency.

## Development server

Run `yarn dev` for a dev server. Navigate to `http://localhost:5173/`. The application will automatically reload if you change any of the source files.

![development server running in the cli][developmentServer]

## Code scaffolding

To generate a new component, directive, pipe, service, class, guard, interfac, enum, module, etc., just create them in your editor. No specific command exists in Vite for it.

## Build

Run `yarn build` to build the project for production usage or `yarn build:test` to build for test environment. The build artifacts will be stored in the `dist/` directory.

## Testing

### Running unit tests

Run `yarn test`, `yarn test:dev` to execute the unit tests via [Vitest](https://vitest.dev/) or `yarn test:coverage` for coverage testing. To see the html report of the test, run `yarn test:review`.

![unit test results in the cli][unitTest]

![vitest results in the cli][vitest]

![vitest results in the browser][vitestUi]

![coverage results in the cli][coverage]

### Running end-to-end tests

Run `yarn cypress` to execute the end-to-end tests via a platform of your choice and the help of [Cypress](https://www.cypress.io/).

![cypress results in the chrome browser][cypress]

## License

Copyright (c) 2023 - 2024, Zoltan Belicza

This project uses GNU General Public Licence which is readable in the [LICENSE](LICENSE) file.

## How to Contribute

Simply create newbranch and make a pull request. All contributions, regardless of their size or scope, are welcome and highly appreciated! Thank you.

[developmentServer]: assets/images/development.png
[unitTest]: assets/images/unit.png
[vitest]: assets/images/vitest.png
[vitestUi]: assets/images/vitestui.png
[coverage]: assets/images/coverage.png
[cypress]: assets/images/cypress.png
[screenshot]: assets/images/app-running.png
