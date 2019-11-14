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

module.exports = async command => {
  const child = execa.command(command, {
    stdio: 'inherit',
    shell: true,
  });

  children.push(child);

  try {
    await child;
  } catch (originalError) {
    const error = new Error(originalError.message);
    error.alreadyShown = true;
    throw error;
  } finally {
    removeChild(child);
  }

  return child.exitCode;
};
