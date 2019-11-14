<p align="center">
  <img width="100%" src="https://user-images.githubusercontent.com/880132/68632060-3287bd80-04e5-11ea-9e3c-bdd959755da3.png" />
</p>

[![Actions Status](https://github.com/izhaki/pliz/workflows/Tests/badge.svg)](https://github.com/izhaki/pliz/actions)
[![NPM Version](https://badge.fury.io/js/pliz.svg?style=flat)](https://npmjs.org/package/pliz)

Pliz is a JS-idiomatic alternative to:

- Makefiles
- Long, complex, or unclear scripts in `package.json`

It can also serve as a router for your existing development/build/deploy scripts.

# Quick Start

## 1. Install

```shell
yarn add pliz --dev
```

## 2. Create plizers

Create the following `plizers.js` file (or `plizers/index.js`) in your project root:

```js
const { exe, log } = require('pliz');

const say = ([text]) => {
  log(`${text}!`);
};

const list = async () => {
  await exe('ls -lh');
};

module.exports = {
  say,
  list,
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
import { exe, log } from 'pliz';

export const say = ([text]) => {
  log(`${text}!`);
};

export const list = async () => {
  await exe('ls -lh');
};
```

</details>

## 3. Use

In your shell:

```shell
pliz say Hello
pliz list
```
