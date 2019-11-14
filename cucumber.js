module.exports = {
  default: [
    '--require-module @babel/register --require test/*.js -f node_modules/cucumber-pretty',
  ],
};
