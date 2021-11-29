<p align="center">
  <img width="100%" src="https://user-images.githubusercontent.com/880132/68632060-3287bd80-04e5-11ea-9e3c-bdd959755da3.png" />
</p>

[![Actions Status](https://github.com/izhaki/pliz/workflows/Tests/badge.svg)](https://github.com/izhaki/pliz/actions)
[![NPM Version](https://badge.fury.io/js/pliz.svg?style=flat)](https://npmjs.org/package/pliz)

Pliz is a cli tool that invokes JS functions (typically development, build, or deploy tasks).

Pliz can be supercharged with [Google's zx](https://github.com/google/zx) for ultimate shell power.

# Example

When calling:

```shell
$ pliz bump minor
```

A function like this may be invoked:

```js
// plizers.js
import { $ } from 'zx';

export async function bump([versionType]) {
  await $`npm version ${versionType}`;
  await $`git push`;
  await $`git push --tags`;
}
```

# Rationale

## With pliz

- All tasks are written in javascript and can be easily invoked from command line<sup>1</sup>.
- Single source of truth, in a single file/folder.
- Reduction of cognitive load.

<sup>1</sup> _Existing shell scripts do not need migration as their invocation is still possible (via javascript)._

## Without pliz

Modern Javascript projects involve a multitude of development tasks. Typically these live in:

- `package.json` script commands:
  - shell syntax
  - no comments
  - sometimes require extra dependencies (eg, `cross-env`)
  - parametrisation and branching can be tricky
- **shell scripts**:
  - another syntax to learn and maintain
  - shells may differ across machines
- `scripts` folder
  - onboarding and discoverability may be sub-optimal
- **our heads**:
  - What's the command to kill a process? Do everyone remember `-9`? What about Windows?
  - What's the command to enter a docker image interactive shell again?

# Quick Start

## 1. Install Globally

```shell
$ npm i -g pliz
```

## 2. Create plizers

Create the following `plizers.js` file (or `plizers/index.js`) in your project root:

```js
const say = ([text]) => {
  console.log(`${text}!`);
};

module.exports = {
  say,
};
```

<details>
  <summary style="margin-bottom: 10px;">💡 Using ES6</summary>
  
```shell
yarn add --dev @babel/core @babel/register @babel/preset-env
```

`pliz.config.js`:

```js
require('@babel/register')({
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: 'current' },
      },
    ],
  ],
});
```

`plizers.js`:

```js
export const say = ([text]) => {
  console.log(`${text}!`);
};
```

</details>

## 3. Use

In your shell:

```shell
$ pliz say Hello
```
