import { exe, log } from '../src/index';

export const say = ([text]) => {
  log(`${text}!`);
};

export const list = async () => {
  await exe('ls -lh');
};

export const bump = async ([versionType]) => {
  // prettier-ignore
  await exe([
    `npm version ${versionType}`,
    `git push`,
    `git push --tags`
  ]);
};

export const publish = async () => {
  // prettier-ignore
  await exe([
    'npm publish',
    'yarn release'
  ]);
};

export const test = async params => {
  const scenarioName = params.join(' ');
  const scenarioParam = scenarioName ? `--name "${scenarioName}"` : '';
  await exe(`./node_modules/.bin/cucumber-js ${scenarioParam}`);
};
