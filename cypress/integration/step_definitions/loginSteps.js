import { Given } from "cypress-cucumber-preprocessor/steps";
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
