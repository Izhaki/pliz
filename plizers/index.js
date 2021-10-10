import { $ } from 'zx';

export const say = ([text]) => {
  console.log(`${text}!`);
};

// prettier-ignore
export const list = () => $`ls -lh`;

export const test = async (params) => {
  const scenarioName = params.join(' ');
  const scenarioParam = scenarioName ? `--name "${scenarioName}"` : '';
  await $`npx cucumber-js ${scenarioParam}`;
};

export const prettify = async () => {
  await $`npx prettier '{**/,}*.{js,jsx,ts,tsx,json,md,html,yaml,yml}' --ignore-path=.gitignore --write`;
};
