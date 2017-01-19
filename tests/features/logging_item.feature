Feature: Logging item
  
  Scenario: Add logging item
    * I go to add a new logging item
    * I must enter an Actor
    * I must enter an Action
    * I must enter an Amount
    * I must enter the Units
  
  Scenario: Two logging items for same actor
    Given I create a logging item for a new actor
      And I create another logging item for the same actor
    When I go to that actor
    Then I see two logging items