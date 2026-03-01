/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

// Custom commands for Portfolio UI testing
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Toggle the language between PT-BR and EN-US
       */
      toggleLanguage(): Chainable<void>;

      /**
       * Wait for the page to fully load with all animations
       */
      waitForPageLoad(): Chainable<void>;

      /**
       * Check if an element is in viewport
       */
      isInViewport(): Chainable<JQuery<HTMLElement>>;

      /**
       * Toggle a collapsible section (experience, courses, projects)
       */
      toggleSection(sectionId: string): Chainable<void>;

      /**
       * Verify accessibility of social links
       */
      verifyAccessibilityLinks(): Chainable<void>;

      /**
       * Tab to navigate through elements (requires cypress-plugin-tab)
       */
      tab(): Chainable<any>;
    }
  }
}

Cypress.Commands.add('toggleLanguage', () => {
  cy.get('#toggle-language').click();
  cy.wait(300); // Wait for language change animation
});

Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('#homeRoot').should('be.visible');
  cy.get('#home-main').should('be.visible');
  cy.wait(500); // Wait for initial animations
});

Cypress.Commands.add(
  'isInViewport',
  { prevSubject: 'element' },
  (subject: any) => {
    const windowObj = (cy as any).state('window');
    const bottom = Cypress.$(windowObj).height() || 0;
    const rect = subject[0].getBoundingClientRect();

    expect(rect.top).not.to.be.greaterThan(bottom);
    expect(rect.bottom).not.to.be.lessThan(0);

    return cy.wrap(subject);
  },
);

Cypress.Commands.add('toggleSection', (sectionId: string) => {
  cy.get(`#${sectionId}`).click();
  cy.wait(300); // Wait for collapse animation
});

Cypress.Commands.add('verifyAccessibilityLinks', () => {
  // Check that all social links have proper attributes
  cy.get('a#mailto').should('have.attr', 'href').and('include', 'mailto:');

  cy.get('a#linkedin')
    .should('have.attr', 'href')
    .and('include', 'linkedin.com');

  cy.get('a#github').should('have.attr', 'href').and('include', 'github.com');
});

export {};
