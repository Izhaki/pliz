const { exe, log } = require('./index');

const say = ([text]) => {
  log(`${text}!`);
};

const list = async () => {
  await exe('ls -lh');
};

module.exports = {
  say,
  list,
};
