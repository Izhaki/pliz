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
const { exe } = require('pliz');

const say = ([text]) => {
  console.log(`${text}!`);
};

const list = () => exe('ls -lh');

module.exports = {
  say,
  list,
  bump,
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
import { exe } from 'pliz';

export const say = ([text]) => {
  console.log(`${text}!`);
};

export const list = () => exe('ls -lh');
```

</details>

## 3. Use

In your shell:

```shell
pliz say Hello
pliz list
```
