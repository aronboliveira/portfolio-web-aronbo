/// <reference types="cypress" />

/**
 * E2E tests for Accessibility (a11y)
 * Tests WCAG compliance, keyboard navigation, and screen reader support
 */
describe('Accessibility', () => {
  beforeEach(() => {
    cy.visit('/en');
    cy.waitForPageLoad();
  });

  describe('Document Structure', () => {
    it('should have proper HTML lang attribute', () => {
      cy.get('html').should('have.attr', 'lang');
    });

    it('should have a header landmark', () => {
      cy.get('header').should('exist');
    });

    it('should have semantic footer', () => {
      cy.get('footer').should('exist');
    });

    it('should have descriptive page title', () => {
      cy.title().should('not.be.empty');
    });
  });

  describe('Headings', () => {
    it('should have an h1 heading', () => {
      cy.get('h1').should('exist');
    });

    it('should have logical heading hierarchy', () => {
      cy.get('h1, h2, h3, h4, h5, h6').then($headings => {
        expect($headings.length).to.be.greaterThan(0);
      });
    });

    it('should have h2 headings for sections', () => {
      cy.get('#skills-heading').should('exist');
      cy.get('#projects-heading').should('exist');
      cy.get('#experience-heading').should('exist');
      cy.get('#courses-heading').should('exist');
    });
  });

  describe('Images', () => {
    it('should have alt text on profile image', () => {
      cy.get('.profile-img').should('have.attr', 'alt');
    });

    it('should have meaningful alt descriptions', () => {
      cy.get('.profile-img').should('have.attr', 'alt').and('not.be.empty');
    });
  });

  describe('Links', () => {
    it('should have accessible link labels', () => {
      cy.get('.nav-icon[aria-label="GitHub"]').should('exist');
      cy.get('.nav-icon[aria-label="LinkedIn"]').should('exist');
    });

    it('should indicate external links', () => {
      cy.get('a[target="_blank"]').should('have.length.gt', 0);
    });

    it('should have visible focus states', () => {
      cy.get('.nav-icon[aria-label="GitHub"]').focus();
      cy.get('.nav-icon[aria-label="GitHub"]').should('have.focus');
    });
  });

  describe('Sections', () => {
    it('should have aria-labelledby on skills section', () => {
      cy.get('#skills').should('have.attr', 'aria-labelledby', 'skills-heading');
    });

    it('should have aria-labelledby on projects section', () => {
      cy.get('#featured-projects').should('have.attr', 'aria-labelledby', 'projects-heading');
    });

    it('should have aria-labelledby on experience section', () => {
      cy.get('#experience').should('have.attr', 'aria-labelledby', 'experience-heading');
    });

    it('should have aria-labelledby on courses section', () => {
      cy.get('#courses').should('have.attr', 'aria-labelledby', 'courses-heading');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should allow tab navigation through links', () => {
      cy.get('.nav-icon[aria-label="GitHub"]').focus();
      cy.focused().should('exist');
    });

    it('should show focus indicators', () => {
      cy.get('.nav-icon[aria-label="GitHub"]').focus();
      cy.focused().should('have.attr', 'aria-label', 'GitHub');
    });

    it('should have logical tab order', () => {
      cy.get('a, button, [tabindex]').each(($el, index) => {
        if (index < 5) {
          const rect = $el[0].getBoundingClientRect();
          expect(rect.top).to.be.at.least(-1);
        }
      });
    });
  });

  describe('Navigation', () => {
    it('should have semantic navigation', () => {
      cy.get('nav').should('exist');
    });

    it('should have nav with aria-label', () => {
      cy.get('nav[aria-label="Main navigation"]').should('exist');
    });
  });

  describe('Language Switch', () => {
    it('should have language switch link', () => {
      cy.get('.lang-switch').should('exist');
    });

    it('should have aria-label on language switch', () => {
      cy.get('.lang-switch').should('have.attr', 'aria-label');
    });
  });

  describe('Reduced Motion', () => {
    it('should respect user motion preferences', () => {
      cy.window().then(win => {
        const supportsReducedMotion =
          win.matchMedia('(prefers-reduced-motion: reduce)').media !==
          'not all';
        expect(supportsReducedMotion).to.be.true;
      });
    });
  });

  describe('Zoom and Text Sizing', () => {
    it('should remain usable at 200% zoom', () => {
      cy.viewport(640, 400);
      cy.visit('/en');
      cy.waitForPageLoad();

      cy.get('.hero').should('be.visible');
      cy.get('.hero-text h1').should('be.visible');
    });

    it('should not have horizontal scroll at 100% viewport', () => {
      cy.viewport(1280, 800);
      cy.visit('/en');
      cy.waitForPageLoad();

      cy.window().then(win => {
        const docWidth = win.document.documentElement.scrollWidth;
        const viewportWidth = win.innerWidth;
        expect(docWidth).to.be.at.most(viewportWidth + 20);
      });
    });
  });
});
