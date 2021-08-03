class loginPage {
  userNameTxt() {
    return cy.get('input[name="username"]');
  }

  passwordTxt() {
    return cy.get('input[name="password"]');
  }

  loginBtn() {
    return cy.get('button[data-test="Button"]');
  }
}

export default loginPage;
