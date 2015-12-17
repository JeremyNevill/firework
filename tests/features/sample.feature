Feature: Homepage
       In order to test common featuers
       As a registered user
       I want to check stuff out

  Scenario: Go to the Timeline page
    Given I go directly to the "" page
    And I login
    And I click the "Timeline" link
    Then I am on the "Timeline" page
    And I close the browser

  Scenario: Go to the Add page
    Given I go directly to the "" page
    And I login
    And I click the "Add" link
    Then I am on the "Add" page
    And I close the browser

  Scenario: Go to the Actors page
    Given I go directly to the "" page
    And I login
    And I click the "Actors" link
    Then I am on the "Actors" page
    And I close the browser

  Scenario: Go to the Actions page
    Given I go directly to the "" page
    And I login
    And I click the "Actions" link
    Then I am on the "Actions" page
    And I close the browser

  Scenario: Go to the Units page
    Given I go directly to the "" page
    And I login
    And I click the "Units" link
    Then I am on the "Units" page
    And I close the browser

  Scenario: Go to the Account page
    Given I go directly to the "" page
    And I login
    And I click the "Account" link
    Then I am on the "Account" page
    And I close the browser

