Feature: Homepage
       In order to test common featuers
       As a registered user
       I want to check stuff out


  Scenario: Go to the Add page
    Given I go directly to the "" page
    And I login
    And I click the "Add" link
    Then I am on the "Add" page

  Scenario: Go to the Actors page
    Given I go directly to the "" page
    And I login
    And I click the "Actors" link
    Then I am on the "Actors" page
