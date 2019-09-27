const { execSync } = require('child_process');

const exe = command => {
  try {
    execSync(command, {
      encoding: 'utf8',
      stdio: 'inherit',
    });
  } catch (error) {
    /* Do nothing - execSync already outputs errors to parent stdout */
  }
};

module.exports = {
  exe,
  log: console.log,
};
