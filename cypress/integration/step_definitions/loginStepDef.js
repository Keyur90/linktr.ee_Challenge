import { Given, Then, And } from "cypress-cucumber-preprocessor/steps";
import LoginPage from "../../support/pageObjects/loginPage";
import LinksPage from "../../support/pageObjects/linksTabPage";
import { interceptGql } from "../../utils/interceptGql";

const loginPage = new LoginPage();
const linksPage = new LinksPage();

Given("I successfully login to linktr.ee application", function () {
  cy.visit("/");
  interceptGql(cy, "/graphql", {
    currentUser: { fixture: "currentUser" },
  });
  cy.login(this.user.user_name, this.user.password);
});

Given("I am on links tab and verified text Lifetime Analytics", () => {
  // cy.intercept("/data", { fixture: "data" }).as("getData");
  // cy.wait("@getData");
  //cy.get("@data").should("have.property", "status", 201);
  // linksPage.noLinksTxt().should("be.visible");
  //slinksPage.noLinksTxt().should("be.visible");
  linksPage.linkTab().click();
  //cy.contains("Lifetime Analytics:").should("be.visible");
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
  linksPage.addNewLinkBtn().click();
});

Then("I should be able to provide {}", () => {});

And("{} in link editor", () => {});

Then("I verified labels Title and Url on link editor", () => {
  linksPage.titleTxt().should("have.text", "Title");
  linksPage.urlTxt().should("have.text", "Url");
});

When("I click on delete icon", () => {
  linksPage.deleteIcon().click();
});

And("I click on delete button", () => {
  linksPage.deleteButton().click();
});

Then("I should see the message of not having any links", () => {
  linksPage.messageTxt().should("be.visible");
});
