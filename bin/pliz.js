#!/usr/bin/env node

const { resolve } = require('path');

const plizerConfig = resolve(process.cwd(), 'plizers.config.js');
try {
  require(plizerConfig);
} catch (error) {
  // Do nothing
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
    if (error.code === 'MODULE_NOT_FOUND') {
      throw `No plizers found.`;
    }
    throw error;
  }
};

run().catch(error => {
  // Do nothing. In shell mode the shell will spit the error
  // if (!error.isCanceled) {
  //   console.log(error);
  // }
});
