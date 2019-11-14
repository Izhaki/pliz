Feature: exe function

  Scenario: Executing commands in series
    Given the following "plizers.js" file:
      """
      const { exe } = require('pliz');

      const echo = async () => {
        await exe([
          `echo 1`,
          `echo 2`,
        ]);
      };

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

  Scenario: Executing commands in parallel
    Given the following "plizers.js" file:
      """
      const { exe } = require('pliz');

      const echo = async () => {
        await exe({
          2: 'sleep 2 && echo 2',
          1: 'sleep 1 && echo 1',
        });
      };

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

