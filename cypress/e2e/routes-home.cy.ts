/// <reference types="cypress" />

describe('Route-based Navigation', () => {
  it('should redirect / to /en', () => {
    cy.visit('/');
    cy.url().should('include', '/en');
  });

  it('should load /en home page', () => {
    cy.visit('/en');
    cy.url().should('include', '/en');
    cy.get('h1').should('contain.text', 'Aron Barbosa');
  });

  it('should load /pt home page', () => {
    cy.visit('/pt');
    cy.url().should('include', '/pt');
    cy.get('h1').should('contain.text', 'Aron Barbosa');
  });

  it('should redirect unknown routes to /en', () => {
    cy.visit('/unknown-route');
    cy.url().should('include', '/en');
  });
});

describe('Home Page — EN', () => {
  beforeEach(() => {
    cy.visit('/en');
  });

  it('should display hero section with correct heading', () => {
    cy.get('h1').should('contain.text', 'Aron Barbosa de Oliveira');
  });

  it('should display subheadline with positioning', () => {
    cy.get('h2')
      .first()
      .should('contain.text', 'Full-Stack Software Developer');
  });

  it('should display summary paragraph', () => {
    cy.contains('internal tools').should('be.visible');
    cy.contains('maintainability').should('be.visible');
  });

  it('should display CTA buttons', () => {
    cy.contains('a', 'Resume').should('be.visible');
  });

  it('should show 3 featured project cards', () => {
    cy.contains('LLM Prompt Purify').should('exist');
    cy.contains('PROSSaúde').should('exist');
    cy.contains('CRM Test').should('exist');
  });

  it('should have skills section with key technologies', () => {
    cy.contains('TypeScript').should('exist');
    cy.contains('Python').should('exist');
    cy.contains('Bash').should('exist');
  });

  it('should have language switch link to PT', () => {
    cy.get('a[href="/pt"]').should('exist');
  });

  it('should have social links', () => {
    cy.get('a[href*="github.com"]').should('exist');
    cy.get('a[href*="linkedin.com"]').should('exist');
    cy.get('a[href*="mailto:"]').should('exist');
  });
});

describe('Home Page — PT', () => {
  beforeEach(() => {
    cy.visit('/pt');
  });

  it('should display PT subheadline', () => {
    cy.get('h2').first().should('contain.text', 'Desenvolvedor Full-stack');
  });

  it('should display PT summary text', () => {
    cy.contains('ferramentas internas').should('be.visible');
  });

  it('should have language switch link to EN', () => {
    cy.get('a[href="/en"]').should('exist');
  });
});

describe('Language Switching via Routes', () => {
  it('should navigate from EN to PT', () => {
    cy.visit('/en');
    cy.get('a[href="/pt"]').first().click();
    cy.url().should('include', '/pt');
    cy.contains('Desenvolvedor Full-stack').should('be.visible');
  });

  it('should navigate from PT to EN', () => {
    cy.visit('/pt');
    cy.get('a[href="/en"]').first().click();
    cy.url().should('include', '/en');
    cy.contains('Full-Stack Software Developer').should('be.visible');
  });
});
