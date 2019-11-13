const { exe, log } = require('./index');

const say = ([text]) => {
  log(`${text}!`);
};

const list = async () => {
  await exe('ls -lh');
};

const bump = async ([versionType]) => {
  await exe(`npm version ${versionType}`);
  await exe(`git push`);
  await exe(`git push --tags`);
};

const publish = async () => {
  await exe('npm publish');
  await exe('yarn release');
};

const test = async () => {
  await exe('./node_modules/.bin/cucumber-js');
};

module.exports = {
  say,
  list,
  bump,
  publish,
  test,
};
