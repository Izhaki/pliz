const execa = require('execa');

const exe = async command => {
  const child = execa.command(command, {
    encoding: 'utf8',
    stdio: 'inherit',
  });

  const onInterrupt = () => {
    child.cancel();
  };

  process.on('SIGINT', onInterrupt);

  try {
    await child;
  } finally {
    process.off('SIGINT', onInterrupt);
  }
};

module.exports = {
  exe,
  log: console.log,
};
