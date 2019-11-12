const { exe, log } = require('./index');

const say = async ([text]) => {
  log(`${text}!`);
};

const list = async () => {
  await exe('ls -lh');
};

module.exports = {
  say,
  list,
};
