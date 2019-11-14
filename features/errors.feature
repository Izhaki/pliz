Feature: Error outputing

  Scenario: Module not found in plizers.js
    Given the following "plizers.js" file:
      """
      require('./blackSwan');
      """
    When I run "pliz"
    Then the output should contain "Cannot find module"
