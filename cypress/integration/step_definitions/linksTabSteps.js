import { Given, Then, And } from "cypress-cucumber-preprocessor/steps";
import loginPage from "../../support/pageObjects/loginPage";
import linksPage from "../../support/pageObjects/linksTabPage";
import { interceptGql } from "../../utils/interceptGql";

const loginPg = new loginPage();
const linksPg = new linksPage();

Given("I am on links tab", () => {
  linksPg.linkTab().click();
});

Given("I have link editor with {} and {}", (Title, Url) => {
  cy.fixture("getLinks").then(function (_) {
    const items = _.data.getLinks.items[0];
    items.title = Title;
    items.url = Url;

    interceptGql(cy, "/graphql", {
      getLinks: { body: _ },
    });
  });
});

When("I click on Add New Link button", () => {
  linksPg.addNewLinkBtn().click();
});

Then("I verified labels Title and Url on link editor", () => {
  linksPg.titleTxt().should("have.text", "Title");
  linksPg.urlTxt().should("have.text", "Url");
});

When("I click on delete icon", () => {
  linksPg.deleteIcon().click();
});

And("I click on delete button", () => {
  linksPg.deleteButton().click();
});

Then("I should see the message of not having any links", () => {
  linksPg.messageTxt().should("be.visible");
});

When("I click on gate button", () => {
  linksPg.gateBtn().click();
});

And("I click on checkbox of Date of Birth", () => {
  linksPg.DOBcheckBox().click();
});

Then("I provided the age", () => {
  cy.get("select").select("30");
});

Then("I should see a message Gate is activated", () => {
  linksPg.messageGate().should("exist");
});
