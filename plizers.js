const { exe, log } = require('./index');

const say = ([text]) => {
  log(`${text}!`);
};

const list = async () => {
  await exe('ls -lh');
};

const bump = async semver => {
  await exe(`npm version ${semver}`);
  await exe(`git push`);
  await exe(`git push --tags`);
};

const publish = async () => {
  await exe('npm publish');
  await exe('yarn release');
};

module.exports = {
  say,
  list,
  bump,
  publish,
};
