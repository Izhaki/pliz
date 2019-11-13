Feature: Pliz

  Scenario: No plizers
    When I run "pliz"
    Then the output should contain "No plizers found."

  Scenario: Plizers in plizer.js
    Given the following "plizers.js" file:
      """
      const { exe, log } = require('pliz');

      const say = ([text]) => {
        log(`${text}!`);
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
      const { exe, log } = require('pliz');

      const say = ([text]) => {
        log(`${text}!`);
      };

      module.exports = {
        say,
      };
      """
    When I run "pliz"
    Then the output should contain "Available plizers"
    And the output should contain "say"

