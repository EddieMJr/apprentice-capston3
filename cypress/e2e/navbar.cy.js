describe("Navbar Tests", () => {
  const baseUrl = "http://localhost:5173"; // change ONLY if needed

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it("should render the navbar", () => {
    cy.get("nav.navbar").should("exist");
    cy.get(".logo img").should("be.visible");
  });

  it("should navigate home when clicking the logo", () => {
    cy.get(".logo img").click();
    cy.url().should("be.eq", `${baseUrl}/`);
  });

  it("should render desktop Login/Register buttons", () => {
    cy.get(".desktop-only button").contains("Login").should("be.visible");
    cy.get(".desktop-only button").contains("Register").should("be.visible");
  });

  it("should navigate to login when clicking desktop Login", () => {
    cy.contains(".desktop-only button", "Login").click();
    cy.url().should("include", "/login");
  });

  it("should navigate to register when clicking desktop Register", () => {
    cy.contains(".desktop-only button", "Register").click();
    cy.url().should("include", "/register");
  });

  // ------------ MOBILE TESTS ------------
  it("should open and close mobile menu when clicking hamburger", () => {
    cy.viewport("iphone-6"); // force mobile mode

    cy.get(".menu-toggle").should("be.visible");

    // Open menu
    cy.get(".menu-toggle").click();
    cy.get(".nav-menu").should("have.class", "open");

    // Close menu
    cy.get(".menu-toggle").click();
    cy.get(".nav-menu").should("not.have.class", "open");
  });

  it("should show mobile Login/Register links when menu is open", () => {
    cy.viewport("iphone-6");

    cy.get(".menu-toggle").click(); // open mobile menu

    cy.contains("li.mobile-only a", "Login").should("be.visible");
    cy.contains("li.mobile-only a", "Register").should("be.visible");
  });

  it("should navigate to login from mobile menu and close menu", () => {
    cy.viewport("iphone-6");

    cy.get(".menu-toggle").click(); // open menu
    cy.contains("li.mobile-only a", "Login").click();

    cy.url().should("include", "/login");

    cy.get(".nav-menu").should("not.have.class", "open"); // menu closed by handleLinkClick
  });

  it("should navigate to register from mobile menu and close menu", () => {
    cy.viewport("iphone-6");

    cy.get(".menu-toggle").click(); // open
    cy.contains("li.mobile-only a", "Register").click();

    cy.url().should("include", "/register");
    cy.get(".nav-menu").should("not.have.class", "open");
  });
});
