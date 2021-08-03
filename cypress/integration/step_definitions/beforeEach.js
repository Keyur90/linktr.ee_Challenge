beforeEach(function () {
  cy.fixture("loginData").then(function (user) {
    this.user = user;
  });
});
