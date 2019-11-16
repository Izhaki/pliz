const exe = require('./exe');

module.exports = async commands => {
  for (const command of commands) {
    await exe(command);
  }
};
