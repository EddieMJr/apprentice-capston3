describe("Password Crack Game", () => {
  const baseUrl = "http://localhost:5173/Game"; 
 

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it("should render the game page", () => {
    cy.contains("Hacker Password Cracker").should("be.visible");
  });

  it("should allow typing a password", () => {
    cy.get(".hack-input").type("Test123!");
    cy.get(".hack-input").should("have.value", "Test123!");
  });

  it("should start hacking animation when clicking Start Hack", () => {
    cy.get(".hack-input").type("Password123!");
    cy.contains("Start Hack").click();

    // loading button appears
    cy.contains("Hacking...").should("be.visible");

    // terminal lines should begin appearing
    cy.get(".terminal-line", { timeout: 3000 }).should("have.length.at.least", 1);
  });

  it("should animate progress bar", () => {
    cy.get(".hack-input").type("Password123!");
    cy.contains("Start Hack").click();

    cy.get(".progress-bar-fill", { timeout: 4000 })
      .invoke("width")
      .should("be.gt", 0);
  });

  it("should show final result after hacking completes", () => {
    cy.get(".hack-input").type("Password123!");
    cy.contains("Start Hack").click();

    cy.contains("Crack Time:", { timeout: 8000 }).should("be.visible");
    cy.get(".result-value").should("be.visible");
  });

  it("should show suggestions based on weak password", () => {
    cy.get(".hack-input").type("aaa");
    cy.contains("Start Hack").click();

    cy.contains("Suggestions to Improve Your Password", { timeout: 7000 }).should("be.visible");

    // Should show suggestions that aaa is weak
    cy.contains("Add at least one uppercase letter").should("exist");
    cy.contains("Add numbers").should("exist");
    cy.contains("Add symbols").should("exist");
    cy.contains("Increase password length").should("exist");
  });

  it("should trigger hacking with Enter key", () => {
    cy.get(".hack-input").type("StrongPass123!{enter}");

    cy.get(".terminal-line", { timeout: 3000 }).should("have.length.at.least", 1);
  });
});
