/// <reference types="cypress" />

/**
 * Comprehensive E2E tests for Portfolio Homepage
 * Tests critical user flows and UI/UX interactions
 */
describe('Portfolio Homepage', () => {
  beforeEach(() => {
    cy.visit('/en');
    cy.waitForPageLoad();
  });

  describe('Page Load', () => {
    it('should load the homepage successfully', () => {
      cy.get('.home-page').should('exist');
      cy.get('.hero').should('be.visible');
    });

    it('should display the hero section', () => {
      cy.get('.hero-content').should('be.visible');
    });

    it('should not have any console errors during load', () => {
      cy.window().then(win => {
        cy.spy(win.console, 'error').as('consoleError');
      });
      cy.get('@consoleError').should('not.have.been.called');
    });
  });

  describe('Profile Section', () => {
    it('should display the profile image', () => {
      cy.get('.profile-img')
        .should('be.visible')
        .and('have.attr', 'alt', 'Aron Barbosa de Oliveira');
    });

    it('should have eager loading on profile image', () => {
      cy.get('.profile-img').should('have.attr', 'loading', 'eager');
    });

    it('should display the name', () => {
      cy.get('.hero-text h1').should('contain.text', 'Aron Barbosa');
    });

    it('should display the subtitle', () => {
      cy.get('.hero-text .subtitle').should(
        'contain.text',
        'Full-Stack Software Developer',
      );
    });
  });

  describe('Navigation Links', () => {
    it('should have an email link', () => {
      cy.get('.nav-icon[aria-label="Email"]')
        .should('be.visible')
        .and('have.attr', 'href', 'mailto:aron.b.96@gmail.com');
    });

    it('should have a LinkedIn link', () => {
      cy.get('.nav-icon[aria-label="LinkedIn"]')
        .should('be.visible')
        .and('have.attr', 'href')
        .and('include', 'linkedin.com');
    });

    it('should have a GitHub link', () => {
      cy.get('.nav-icon[aria-label="GitHub"]')
        .should('be.visible')
        .and('have.attr', 'href')
        .and('include', 'github.com');
    });

    it('should open LinkedIn in new tab', () => {
      cy.get('.nav-icon[aria-label="LinkedIn"]').should(
        'have.attr',
        'target',
        '_blank',
      );
    });

    it('should open GitHub in new tab', () => {
      cy.get('.nav-icon[aria-label="GitHub"]').should(
        'have.attr',
        'target',
        '_blank',
      );
    });

    it('should have proper security attributes on external links', () => {
      cy.get('.nav-icon[aria-label="LinkedIn"]')
        .should('have.attr', 'rel')
        .and('include', 'noopener');
      cy.get('.nav-icon[aria-label="GitHub"]')
        .should('have.attr', 'rel')
        .and('include', 'noreferrer');
    });
  });

  describe('Social Icons SVG', () => {
    it('should display email SVG icon', () => {
      cy.get('.nav-icon[aria-label="Email"] svg').should('be.visible');
    });

    it('should display LinkedIn SVG icon', () => {
      cy.get('.nav-icon[aria-label="LinkedIn"] svg').should('be.visible');
    });

    it('should display GitHub SVG icon', () => {
      cy.get('.nav-icon[aria-label="GitHub"] svg').should('be.visible');
    });
  });
});
