describe("Login Page Tests", () => {
  const baseUrl = "http://localhost:5173";

  beforeEach(() => {
    cy.visit(`${baseUrl}/login`);
  });

  it("should show errors if fields are empty", () => {
    cy.get("button[type='submit']").click();
    cy.contains("Username is required.").should("be.visible");
    cy.contains("Password is required.").should("be.visible");
  });

  it("should show error for short password", () => {
    cy.get("#floatingUsername").type("eddiemjr");
    cy.get("#floatingPassword").type("123"); // MUST be short
    cy.get("button[type='submit']").click();
    cy.contains("Password must be at least 6 characters long.").should("be.visible");
  });

  it("should show error if API returns invalid credentials", () => {
    cy.intercept("POST", "**/api/login", {
      statusCode: 401,
      body: { error: "Invalid username or password." }
    }).as("failedLogin");

    cy.get("#floatingUsername").type("wronguser");
    cy.get("#floatingPassword").type("wrongpass123");
    cy.get("button[type='submit']").click();

    cy.wait("@failedLogin");
    cy.contains("Error: Invalid username or password.").should("be.visible");
  });

  it("should login successfully and redirect to dashboard", () => {
    cy.intercept("POST", "**/api/login", {
      statusCode: 200,
      body: {
        token: "fake-jwt",
        user: { id: 1, username: "Edgardo" }
      }
    }).as("successfulLogin");

    cy.get("#floatingUsername").type("Edgardo");
    cy.get("#floatingPassword").type("mypassword123");
    cy.get("button[type='submit']").click();

    cy.wait("@successfulLogin");
    cy.contains("Login successful!").should("be.visible");

    cy.url().should("include", "/dashboard");
  });
});
