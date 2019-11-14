const execa = require('execa');
const { isArray } = Array;

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

async function exeSingle(command) {
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
}

function exeSeries(commands) {
  return commands.reduce(async (previousPromise, command) => {
    await previousPromise;
    return exeSingle(command);
  }, Promise.resolve());
}

module.exports = async command => {
  if (typeof command === 'string') {
    return exeSingle(command);
  } else if (isArray(command)) {
    exeSeries(command);
  }
};
