import { exe, series, log } from '../src/index';

export const say = ([text]) => {
  log(`${text}!`);
};

// prettier-ignore
export const list = () => exe(
  'ls -lh'
);

// prettier-ignore
export const bump = ([versionType]) => series([
  `npm version ${versionType}`,
  `git push`,
  `git push --tags`
]);

// prettier-ignore
export const publish = () => series([
  'npm publish',
  'yarn release'
]);

export const test = async (params) => {
  const scenarioName = params.join(' ');
  const scenarioParam = scenarioName ? `--name "${scenarioName}"` : '';
  await exe(`cucumber-js ${scenarioParam}`);
};

export const prettify = async () => {
  await exe(
    `prettier '{**/,}*.{js,jsx,ts,tsx,json,md,html,yaml,yml}' --ignore-path=.gitignore --write`
  );
};
