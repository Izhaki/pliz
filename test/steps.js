import { Given, When, Then } from 'cucumber';
import { expect } from 'chai';

Given('the following {string} file:', function(fileName, content) {
  this.writeFile(fileName, content);
});

When('I run {string}', async function(command) {
  const { all } = await this.exe(command);
  this.output = all;
});

Then('the output should contain {string}', function(needle) {
  expect(this.output).to.contain(needle);
});

Then('the output should not contain {string}', function(needle) {
  expect(this.output).not.to.contain(needle);
});

Then('the output should be:', function(expected) {
  expect(this.output).to.eql(expected);
});
