Feature: Non root invokation
  Users should be able to execute `pliz` outside the root folder.

  Scenario: Run pliz outside root folder
    Given the following "plizers.js" file:
      """
      import { log } from 'pliz';

      export const say = ([text]) => {
        log(`${text}!`);
      };
      """
    And the following "pliz.config.js" file:
      """
      require('@babel/register')({
        presets: [
          [
            '@babel/preset-env',
            {
              targets: { node: 'current' },
            },
          ],
        ],
      });
      """
    When I cd to "node_modules" and run "pliz say hello!"
    Then the output should contain "hello!"

  Scenario: No package.json
    Given the following "plizers.js" file:
      """
      const { log } = require('pliz');

      const say = ([text]) => {
        log(`${text}!`);
      };

      module.exports = {
        say,
      };
      """
    And that I delete "package.json"
    When I run "pliz say hello!"
    Then the output should contain "pliz: could not project root - no package.json in any parent folder"

