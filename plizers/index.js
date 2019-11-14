import { exe, log } from '../src/index';

export const say = ([text]) => {
  log(`${text}!`);
};

export const list = async () => {
  await exe('ls -lh');
};

export const bump = async ([versionType]) => {
  await exe(`npm version ${versionType}`);
  await exe(`git push`);
  await exe(`git push --tags`);
};

export const publish = async () => {
  await exe('npm publish');
  await exe('yarn release');
};

export const test = async params => {
  const scenarioName = params.join(' ');
  const scenarioParam = scenarioName ? `--name "${scenarioName}"` : '';
  await exe(`./node_modules/.bin/cucumber-js ${scenarioParam}`);
};
