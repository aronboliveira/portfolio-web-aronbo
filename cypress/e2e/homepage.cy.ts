/// <reference types="cypress" />

/**
 * Comprehensive E2E tests for Portfolio Homepage
 * Tests critical user flows and UI/UX interactions
 */
describe('Portfolio Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForPageLoad();
  });

  describe('Page Load', () => {
    it('should load the homepage successfully', () => {
      cy.get('#homeRoot').should('exist');
      cy.get('#home-main').should('be.visible');
    });

    it('should display the main container', () => {
      cy.get('.main-container').should('be.visible');
    });

    it('should not have any console errors during load', () => {
      cy.window().then((win) => {
        cy.spy(win.console, 'error').as('consoleError');
      });
      cy.get('@consoleError').should('not.have.been.called');
    });
  });

  describe('Profile Section', () => {
    it('should display the profile image', () => {
      cy.get('#profile-img')
        .should('be.visible')
        .and('have.attr', 'alt', 'Aron Barbosa');
    });

    it('should have lazy loading on profile image', () => {
      cy.get('#profile-img').should('have.attr', 'loading', 'lazy');
    });

    it('should display the name "Aron Barbosa"', () => {
      cy.get('#name-presentation').should('contain.text', 'Aron Barbosa');
    });

    it('should display greeting text in Portuguese by default', () => {
      cy.get('#hi-presentation').should('contain.text', 'Olá');
    });
  });

  describe('Navigation Links', () => {
    it('should have an email link', () => {
      cy.get('#mailto')
        .should('be.visible')
        .and('have.attr', 'href', 'mailto:aron.b.96@gmail.com');
    });

    it('should have a LinkedIn link', () => {
      cy.get('#linkedin')
        .should('be.visible')
        .and('have.attr', 'href')
        .and('include', 'linkedin.com');
    });

    it('should have a GitHub link', () => {
      cy.get('#github')
        .should('be.visible')
        .and('have.attr', 'href')
        .and('include', 'github.com');
    });

    it('should open LinkedIn in new tab', () => {
      cy.get('#linkedin').should('have.attr', 'target', '_blank');
    });

    it('should open GitHub in new tab', () => {
      cy.get('#github').should('have.attr', 'target', '_blank');
    });

    it('should have proper security attributes on external links', () => {
      cy.get('#linkedin').should('have.attr', 'rel').and('include', 'noopener');
      cy.get('#github').should('have.attr', 'rel').and('include', 'noreferrer');
    });
  });

  describe('Social Icons SVG', () => {
    it('should display email SVG icon', () => {
      cy.get('#mailto svg').should('be.visible');
    });

    it('should display LinkedIn SVG icon', () => {
      cy.get('#linkedin svg').should('be.visible');
    });

    it('should display GitHub SVG icon', () => {
      cy.get('#github svg').should('be.visible');
    });
  });
});
