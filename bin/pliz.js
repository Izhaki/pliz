#!/usr/bin/env node
const { resolve, normalize, join, dirname } = require('path');
const { existsSync } = require('fs');

const isRootFolder = path => existsSync(join(path, 'package.json'));

const getRootFolder = () => {
  let previous = null;
  let current = normalize(process.cwd());

  do {
    if (isRootFolder(current)) {
      return current;
    }
    previous = current;
    current = dirname(current);
  } while (current !== previous);

  return null;
};

const cwd = getRootFolder();

/*
Change the process.cwd to the root folder (where package.json is).
Not doing so can cause troubles, for example, @babel/register won't kick in unless
cwd is provided explicitly.
*/
process.chdir(cwd);

/*
Error message when pliz.config.js is not found:

Cannot find module 'root/pliz.config.js'

Error message when a file require in pliz.config.js is not found:

Cannot find module './blackSwan'
Require stack:
- root/pliz.config.js
- root/bin/pliz.js

So we wrap the file name in quotation marks so not to match against the stack trace.
*/
const isModuleNotFound = (error, fileName) =>
  error.code === 'MODULE_NOT_FOUND' && error.message.includes(`'${fileName}'`);

const plizConfig = resolve(cwd, 'pliz.config.js');
try {
  const config = require(plizConfig);
  if (config.packageManager === 'yarn') {
    process.env.pliz_packageManager = 'yarn';
  }
} catch (error) {
  if (!isModuleNotFound(error, plizConfig)) {
    throw error;
  }
}

const [, , plizerName, ...args] = process.argv;

const outputPlizerNames = plizers => {
  console.log('Available plizers:');
  Object.keys(plizers).forEach(plizer => {
    console.log(plizer);
  });
};

const run = async () => {
  const plizerFile = resolve(cwd, 'plizers');

  try {
    const plizers = require(plizerFile);

    const plizer = plizers[plizerName];
    if (plizer) {
      await plizer(args);
    } else {
      if (plizerName !== undefined) {
        console.log(`Could not find plizer "${plizerName}".`);
      }
      outputPlizerNames(plizers);
    }
  } catch (error) {
    if (isModuleNotFound(error, plizerFile)) {
      throw `No plizers found.`;
    }
    throw error;
  }
};

run().catch(error => {
  if (!error.isCanceled && !error.alreadyShown) {
    console.log(error);
  }
});
