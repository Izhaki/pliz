const execa = require('execa');

const children = [];

const removeChild = child => {
  const index = children.indexOf(child);
  children.splice(index, 1);
};

const cancelAllChildren = () => {
  children.forEach(child => {
    child.cancel();
  });
};

process.on('SIGINT', cancelAllChildren);
process.on('SIGTERM', cancelAllChildren);

const exe = async command => {
  const child = execa.command(command, {
    stdio: 'inherit',
    shell: true,
  });

  children.push(child);

  try {
    await child;
  } catch (error) {
    // Do nothing. In shell mode the shell will spit the error
  } finally {
    removeChild(child);
  }

  return child.exitCode;
};

module.exports = {
  exe,
  log: console.log,
};
