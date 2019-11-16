const exe = require('./exe');

module.exports = obj => {
  const commands = Object.values(obj);
  return Promise.all(commands.map(exe));
};
