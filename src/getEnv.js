const execa = require('execa');

const getNpmEnv = async () => {
  const { stdout } = await execa.command('npm run env');
  return stdout.split('\n').reduce((obj, line) => {
    const [key, value] = line.split(/=(.*)/);
    obj[key] = value;
    return obj;
  }, {});
};

const getYarnEnv = async () => {
  const { stdout } = await execa.command('yarn env');
  const lines = stdout.split('\n');
  lines.shift(); // Remove yarn version (yarn run v1.17.3)
  lines.pop(); // Remove success message (✨  Done in 0.08s)
  const json = lines.join('\n');
  return JSON.parse(json);
};

const getEnv = async () => {
  const isYarn = process.env.pliz_packageManager === 'yarn';
  return isYarn ? getYarnEnv() : getNpmEnv();
};

module.exports = getEnv;
