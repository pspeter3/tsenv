# tsenv

[![NPM Version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

A strict TypeScript runtime environment that supports AMD and helpers.

## Quick Usage

`tsenv` is intended to be used in conjuction with the single AMD file out in TypeScript 1.8 and the `--noEmitHelpers` flag. For example:

```sh
tsc --module amd --noEmitHelpers --outFile out.js a.ts b.ts
```

### Browser

On the browser, `tsenv` should be the first script tag loaded. For example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>tsenv</title>
</head>
<body>
  <script src="/path/to/tsenv.js"></script>
  <script src="/path/to/out.js"></script>
</body>
</html>
```

### Node

Use the `--require` option to setup the environment before other scripts. For example:

```sh
node --require path/to/tsenv.js --require path/to/out.js
```

## Globals

### `__extends`

The `__extends` function allows TypeScript to create subclasses and setup prototypical inheritance.

### `define`

The `define` function allows modules to be defined one time. All modules must have an id, an array of dependencies, and a factory function. If a module is defined more than once, an error will be thrown.

### `requirejs`

The `requirejs` function lazily evaluates the module based on the passed id and returns that module's exports. If the module is not defined, an error will be thrown. Modules are not evaluated until they are required. The system does not support cycles nor will it detect any cycles.

## Contributing

Please feel free to submit PRs.

[npm-url]: https://www.npmjs.org/package/tsenv
[npm-image]: http://img.shields.io/npm/v/tsenv.svg?style=flat-square

[travis-url]: http://travis-ci.org/pspeter3/tsenv
[travis-image]: http://img.shields.io/travis/pspeter3/tsenv.svg?style=flat-square
