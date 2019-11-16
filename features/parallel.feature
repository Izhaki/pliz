Feature: parallel execution

  Scenario: Executing commands in parallel
    Given the following "plizers.js" file:
      """
      const { parallel } = require('pliz');

      const sleep = () => parallel([
        'sleep 2 && echo 2',
        'sleep 1 && echo 1',
      ])

      module.exports = {
        sleep,
      };
      """
    When I run "pliz sleep"
    Then the output should be:
      """
      1
      2
      """

  Scenario: Failing command when executing in parallel
    Other commands should still be executed
    Given the following "plizers.js" file:
      """
      const { parallel } = require('pliz');

      const sleep = () => parallel([
        'blackSwan',
        'sleep 1 && echo 1',
      ])

      module.exports = {
        sleep,
      };
      """
    When I run "pliz sleep"
    Then the output should contain "blackSwan: command not found"
    And the output should contain "1"
