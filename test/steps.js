import { Given, When, Then } from 'cucumber';
import { expect } from 'chai';

Given('the following {string} file:', function (fileName, content) {
  this.writeFile(fileName, content);
});

Given('that I delete {string}', async function (fileName) {
  await this.exe(`rm ${fileName}`);
});

When('I run {string}', async function (command) {
  try {
    const { all } = await this.exe(command);
    this.output = all;
  } catch (error) {
    // bin/pliz.js may throw errors (say if no package.json), which will end up as EPERM
    // In this case, we get the stdio (all) from the error
    this.output = error.all;
  }
});

When('I cd to {string} and run {string}', async function (cwd, command) {
  const { all } = await this.exe(command, { cwd });
  this.output = all;
});

Then('the output should contain {string}', function (needle) {
  expect(this.output).to.contain(needle);
});

Then('the output should not contain {string}', function (needle) {
  expect(this.output).not.to.contain(needle);
});

Then('the output should be:', function (expected) {
  expect(this.output).to.eql(expected);
});
