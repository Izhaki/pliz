#!/usr/bin/env node
const { resolve } = require('path');

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

const plizConfig = resolve(process.cwd(), 'pliz.config.js');
try {
  require(plizConfig);
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
  const plizerFile = resolve(process.cwd(), 'plizers');

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
