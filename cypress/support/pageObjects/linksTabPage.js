class linksTabPage {
  linkTab() {
    return cy.contains("Links");
  }
  addNewLinkBtn() {
    return cy.get('button[data-testid="LinkEditor_Link_Add_Button"]');
  }

  titleTxt() {
    return cy.get('p[data-testid="title_Input_V1Label"]');
  }

  urlTxt() {
    return cy.get('p[data-testid="url_Input_V1Label"]');
  }

  noLinksTxt() {
    return cy.contains("You don't have any links to display");
  }

  deleteIcon() {
    return cy.get('button[data-testid="LinkEditor_DeletePanel_Toggle_Button"]');
  }

  deleteButton() {
    return cy.get('button[data-testid="LinkEditor_DeletePanel_Delete_Button"]');
  }

  messageTxt() {
    return cy.contains("You don't have any links to display.");
  }
  gateBtn() {
    return cy.get('button[data-testid="GATED_LINK_ConfigButton"]');
  }
  DOBcheckBox() {
    return cy.contains("Date of Birth").parent().parent().find("input");
  }

  messageGate() {
    return cy.contains("Gate is activated");
  }
  addLink() {
    return cy.get('button[data-testid="LinkEditor_Link_Add_Button"]');
  }
}

export default linksTabPage;
