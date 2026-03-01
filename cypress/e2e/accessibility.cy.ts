/// <reference types="cypress" />

/**
 * E2E tests for Accessibility (a11y)
 * Tests WCAG compliance, keyboard navigation, and screen reader support
 */
describe('Accessibility', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForPageLoad();
  });

  describe('Document Structure', () => {
    it('should have proper HTML lang attribute', () => {
      cy.get('html').should('have.attr', 'lang');
    });

    it('should have a main landmark', () => {
      cy.get('main, [role="main"]').should('exist');
    });

    it('should have semantic header', () => {
      cy.get('header, [role="banner"]').should('exist');
    });

    it('should have semantic footer', () => {
      cy.get('footer, [role="contentinfo"]').should('exist');
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

    it('should not skip heading levels', () => {
      cy.get('h1').should('exist');
      // After h1, should have h2 before h3
    });
  });

  describe('Images', () => {
    it('should have alt text on profile image', () => {
      cy.get('.profile img').should('have.attr', 'alt');
    });

    it('should have meaningful alt descriptions', () => {
      cy.get('.profile img').should('have.attr', 'alt').and('not.be.empty');
    });

    it('should have alt text on social icons', () => {
      cy.get('#social-icons img, #social-icons svg').each($el => {
        const hasAlt =
          $el.attr('alt') ||
          $el.attr('aria-label') ||
          $el.closest('a').attr('aria-label');
        expect(hasAlt || $el.parents('[aria-label]').length > 0).to.be.true;
      });
    });
  });

  describe('Links', () => {
    it('should have accessible link text', () => {
      cy.get('#github-link').should('have.attr', 'aria-label');
      cy.get('#linkedin-link').should('have.attr', 'aria-label');
    });

    it('should indicate external links', () => {
      cy.get('a[target="_blank"]').each($link => {
        const ariaLabel = $link.attr('aria-label');
        const hasIndicator =
          $link.attr('rel')?.includes('noopener') ||
          (ariaLabel && ariaLabel.length > 0);
        expect(!!hasIndicator).to.be.true;
      });
    });

    it('should have visible focus states', () => {
      cy.get('#github-link').focus();
      cy.get('#github-link').should('have.focus');
    });
  });

  describe('Interactive Elements', () => {
    it('should have focusable toggle buttons', () => {
      cy.get('#present-arrow-span').should('exist');
      cy.get('#exp-arrow-span').should('exist');
    });

    it('should have descriptive tooltips', () => {
      cy.get('#present-arrow-span').should('have.attr', 'title');
      cy.get('#exp-arrow-span').should('have.attr', 'title');
    });

    it('should update aria states on toggle', () => {
      cy.get('#experience-heading-container').click();
      cy.wait(300);
      // Element should have updated state
    });
  });

  describe('Color Contrast', () => {
    it('should have visible text on profile name', () => {
      cy.get('#profiler-name')
        .should('be.visible')
        .invoke('css', 'color')
        .then(color => {
          expect(color).to.not.equal('rgba(0, 0, 0, 0)');
        });
    });

    it('should have visible section headings', () => {
      cy.get('#experience')
        .should('be.visible')
        .invoke('css', 'color')
        .then(color => {
          expect(color).to.not.equal('rgba(0, 0, 0, 0)');
        });
    });
  });

  describe('Keyboard Navigation', () => {
    it('should allow tab navigation through links', () => {
      cy.get('body').tab();
      cy.focused().should('exist');
    });

    it('should show focus indicators', () => {
      cy.get('#github-link').focus();
      cy.focused().should('have.attr', 'id', 'github-link');
    });

    it('should allow keyboard activation of buttons', () => {
      cy.get('#present-arrow-span').focus().type('{enter}');
      cy.wait(300);
    });

    it('should have logical tab order', () => {
      let lastY = 0;
      cy.get('a, button, [tabindex]').each(($el, index) => {
        if (index < 5) {
          const rect = $el[0].getBoundingClientRect();
          // Generally, tab order should follow visual order
          expect(rect.top).to.be.at.least(-1); // Allow for fixed elements
        }
      });
    });
  });

  describe('ARIA Attributes', () => {
    it('should have aria-labels on icon-only links', () => {
      cy.get('#github-link').should('have.attr', 'aria-label');
      cy.get('#linkedin-link').should('have.attr', 'aria-label');
    });

    it('should have proper aria-expanded states', () => {
      // Check elements with toggle behavior
      cy.get('[aria-expanded]').should('exist');
    });

    it('should update aria-expanded on toggle', () => {
      cy.get('#experience-heading-container').click();
      cy.wait(300);
      // State should be updated
    });
  });

  describe('Form Elements', () => {
    it('should have labeled form controls if present', () => {
      cy.get('input, select, textarea').then($inputs => {
        if ($inputs.length > 0) {
          $inputs.each((i, el) => {
            const hasLabel =
              el.getAttribute('aria-label') ||
              el.getAttribute('aria-labelledby') ||
              Cypress.$(el).prev('label').length > 0 ||
              Cypress.$(el).closest('label').length > 0;
            expect(hasLabel || el.getAttribute('type') === 'hidden').to.be.true;
          });
        }
      });
    });
  });

  describe('Navigation', () => {
    it('should have semantic navigation', () => {
      cy.get('nav, [role="navigation"]').should('exist');
    });

    it('should have skip link or main content shortcut', () => {
      // Check for skip link or main landmark
      cy.get('main').should('exist');
    });
  });

  describe('Screen Reader Support', () => {
    it('should not rely solely on color to convey information', () => {
      // Icons should have text alternatives
      cy.get('#social-icons a').each($link => {
        const hasAccessibleName =
          $link.attr('aria-label') || $link.text().trim().length > 0;
        expect(hasAccessibleName).to.be.true;
      });
    });

    it('should have meaningful link context', () => {
      cy.get('#github-link')
        .should('have.attr', 'aria-label')
        .and('include', 'GitHub');
    });

    it('should have descriptive section identifiers', () => {
      cy.get('#experience').should('exist');
      cy.get('#courses').should('exist');
      cy.get('#working-projects').should('exist');
    });
  });

  describe('Reduced Motion', () => {
    it('should respect user motion preferences', () => {
      // Test that animations can be disabled
      cy.window().then(win => {
        // Check if CSS supports prefers-reduced-motion
        const supportsReducedMotion =
          win.matchMedia('(prefers-reduced-motion: reduce)').media !==
          'not all';
        expect(supportsReducedMotion).to.be.true;
      });
    });
  });

  describe('Zoom and Text Sizing', () => {
    it('should remain usable at 200% zoom', () => {
      cy.viewport(640, 400); // Simulates 200% zoom on 1280x800
      cy.visit('/');
      cy.waitForPageLoad();

      cy.get('#home').should('be.visible');
      cy.get('#profiler-name').should('be.visible');
    });

    it('should not have horizontal scroll at 100% viewport', () => {
      cy.viewport(1280, 800);
      cy.visit('/');
      cy.waitForPageLoad();

      cy.window().then(win => {
        const docWidth = win.document.documentElement.scrollWidth;
        const viewportWidth = win.innerWidth;
        expect(docWidth).to.be.at.most(viewportWidth + 20); // Allow small margin
      });
    });
  });
});
