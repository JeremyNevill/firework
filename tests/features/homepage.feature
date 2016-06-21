Feature: Homepage

  Scenario: New User
    Given I create an account
    When I login
    Then I see an empty Timeline
      And I see no Actors
      And I see no Actions
      And I see no Units
  
  Scenario: Existing User
    Given I create some Actors
      And I create some Actions
      And I create some Units
    When I login
    Then I see the Timeline
      And I see my Actors
      And I see my Actions
      And I see my Units
