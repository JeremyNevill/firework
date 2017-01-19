Feature: Homepage

  Scenario: New User
    Given I create an account
    When I login
    Then I see an empty Timeline
      And I see no Actors
      And I see no Actions
      And I see no Units
  
  Scenario: Existing User
    Given I create a logging item
    When I login
    Then I see it in the Timeline
      And I see its actor
      And I see its action
      And I see its unit
