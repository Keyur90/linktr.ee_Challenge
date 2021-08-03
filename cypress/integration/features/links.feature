Feature: Add, delete and gate the link
As a user I should be able to add a new link and delete the same

Background: 
   Given I successfully login to linktr.ee application

Scenario Outline: Add and delete the link editor 
        Given I have link editor with <Title> and <Url>
        When I click on delete icon
        And I click on delete button
        Then I should see the message of not having any links

        Examples:
          | Title  | Url                     | 
          | Google | https://www.google.com/ |  

Scenario Outline: Gate the link by date of birth
        Given I have link editor with <Title> and <Url>
        When I click on gate button
        And I click on checkbox of Date of Birth
        And I provided the age
        Then I should see a message Gate is activated

        Examples:
          | Title  | Url                     | 
          | Google | https://www.google.com/ |  




        