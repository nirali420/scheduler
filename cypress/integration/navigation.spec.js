describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should select Tuesday with background-color: rgb(242, 242, 242) ", () => {
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.css", "background-color", "rgb(242, 242, 242)");
  });
});
