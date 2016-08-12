# Kirby CMS Starter kit with Gulp
A template to kickstart a new project using Kirby CMS.
Using Gulp for handling SCSS, Typescript and Image optimizations.

## Contents
- Lints, compiles and uglifies Typescript
- Compiles and autoprefixes SCSS
- Generates a custom Modernizr build with gulp-modernizr

## Installation
Rename the `local.config.example.js` file to `local.config.js` and adjust settings if needed.
You will need the [kirby-cli](https://github.com/getkirby/cli) to install Kirby Core and (optionally) Kirby panel.

### Kirby CLI
All Kirby CLI commands should be run while in the `public/` folder.

To install *Kirby Core*:

```bash
$ kirby install:core
```

To install *Kirby Panel*:

```bash
$ kirby install:panel
```

Please check the [kirby-cli](https://github.com/getkirby/cli) repository for more information about installation, other  available tasks and the latest updates.

## Usage
Run all asset tasks. After the build, the public folder contains everything for a production ready website.

```bash 
$ gulp build
```

Build all assets, connect to a PHP server and start watching the files.

```bash
$ gulp
```

Deploy all files in `public/` to a specified directory (probably SSH). Uses rsync.

```bash
$ gulp deploy
```
