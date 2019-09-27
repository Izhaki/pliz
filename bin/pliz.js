#!/usr/bin/env node

const fs = require('fs');
const { resolve } = require('path');

try {
  require('@babel/register');
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
  const plizerFile = resolve(process.cwd(), 'plizers.js');
  if (!fs.existsSync(plizerFile)) {
    throw `No plizers.js in working directory.`;
  }

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
};

run().catch(error => {
  console.log(error);
});
