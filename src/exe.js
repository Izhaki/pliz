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

const markAsAlreadyShown = originalError => {
  const error = new Error(originalError.message);
  error.alreadyShown = true;
  return error;
};

process.on('SIGINT', cancelAllChildren);
process.on('SIGTERM', cancelAllChildren);

const getCommandType = command => {
  if (typeof command === 'string') {
    return 'string';
  } else if (isArray(command)) {
    return 'array';
  } else if (typeof command === 'object') {
    return 'object';
  }
  throw new Error(
    `Commands can be a string, array or object but got: ${command}`
  );
};

const exeSingle = async command => {
  const child = execa.command(command, {
    stdio: 'inherit',
    shell: true,
  });

  children.push(child);

  try {
    await child;
  } catch (error) {
    throw markAsAlreadyShown(error);
  } finally {
    removeChild(child);
  }
};

const exeSeries = async commands => {
  for (const command of commands) {
    await exeSingle(command);
  }
};

const exeParallel = async obj => {
  const commands = Object.values(obj);
  await Promise.all(commands.map(exeSingle));
};

const exeMap = {
  string: exeSingle,
  array: exeSeries,
  object: exeParallel,
};

module.exports = command => {
  const commandType = getCommandType(command);
  const handler = exeMap[commandType];
  return handler(command);
};
