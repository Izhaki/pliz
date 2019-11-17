const execa = require('execa');
const getEnv = require('./getEnv');

let env;
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

module.exports = async command => {
  env = env || (await getEnv());
  const isPackageManagerCommand =
    command.startsWith('npm') || command.startsWith('yarn');
  const child = execa.command(command, {
    stdio: 'inherit',
    shell: true,
    env,
    // If the command is for npm or yarn, don't use the provided environment
    // (npm by default, but can be set to yarn). So if yarn is set as the package
    // manager in the config, and the command is `npm publish`, we don't get
    // registry.yarnpkg.com in the env
    extendEnv: !isPackageManagerCommand,
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
