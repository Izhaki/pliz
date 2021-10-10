import { exe } from '../src/index';

export const say = ([text]) => {
  console.log(`${text}!`);
};

// prettier-ignore
export const list = () => exe(
  'ls -lh'
);

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
