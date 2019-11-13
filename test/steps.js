import { Given, When, Then } from 'cucumber';
import { expect } from 'chai';

Given('the following {string} file:', function(fileName, content) {
  this.writeFile(fileName, content);
});

When('I run {string}', async function(command) {
  const { stdout } = await this.exe(command);
  this.output = stdout;
});

Then('the output should contain {string}', function(needle) {
  expect(this.output).to.contain(needle);
});
