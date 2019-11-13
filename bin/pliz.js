#!/usr/bin/env node
const { resolve } = require('path');

const isModuleNotFound = error => error.code === 'MODULE_NOT_FOUND';

const plizConfig = resolve(process.cwd(), 'pliz.config.js');
try {
  require(plizConfig);
} catch (error) {
  if (!isModuleNotFound(error)) {
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
    if (isModuleNotFound(error)) {
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
