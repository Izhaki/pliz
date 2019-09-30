const { exe, log } = require('./index');

const say = async ([text]) => {
  log(`${text}!`);
  await exe('ls -lh');
};

module.exports = {
  say,
};
