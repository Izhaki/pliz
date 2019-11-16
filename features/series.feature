Feature: series task execution

  Scenario: Executing commands in series
    Given the following "plizers.js" file:
      """
      const { series } = require('pliz');

      const echo = () => series([
        `echo 1`,
        `echo 2`,
      ]);

      module.exports = {
        echo,
      };
      """
    When I run "pliz echo"
    Then the output should be:
      """
      1
      2
      """

  Scenario: Failing command with serial execution
    A command should not be executed if any command before it failed.
    Given the following "plizers.js" file:
      """
      const { series } = require('pliz');

      const echo = () => series([
        `blackSwan`,
        `echo 2`,
      ]);

      module.exports = {
        echo,
      };
      """
    When I run "pliz echo"
    Then the output should contain "blackSwan: command not found"
    And the output should not contain "2"
