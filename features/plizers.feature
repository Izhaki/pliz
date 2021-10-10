Feature: Invoking Plizers

  Scenario: No plizers
    When I run "pliz"
    Then the output should contain "No plizers found."

  Scenario: Plizers in plizer.js
    Given the following "plizers.js" file:
      """
      const say = ([text]) => {
        console.log(`${text}!`);
      };

      module.exports = {
        say,
      };
      """
    When I run "pliz"
    Then the output should contain "Available plizers"
    And the output should contain "say"

  Scenario: Plizers in plizers/index.js
    Given the following "plizers/index.js" file:
      """
      const say = ([text]) => {
        console.log(`${text}!`);
      };

      module.exports = {
        say,
      };
      """
    When I run "pliz"
    Then the output should contain "Available plizers"
    And the output should contain "say"

  Scenario: ES6 plizers
    Given the following "plizers.js" file:
      """
      export const say = ([text]) => {
        console.log(`${text}!`);
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
    When I run "pliz say hello!"
    Then the output should contain "hello!"

