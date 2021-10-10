Feature: Error outputing

  Scenario: Module not found in plizers.js
    Given the following "plizers.js" file:
      """
      require('./blackSwan');
      """
    When I run "pliz"
    Then the output should contain "Cannot find module"

  Scenario: Command failure
    Given the following "plizers.js" file:
      """
      const { $ } = require('zx');

      const fail = () => $`blackSwan`;

      module.exports = {
        fail,
      };
      """
    When I run "pliz fail"
    Then the output should contain "blackSwan: command not found"
