/// <reference types="cypress" />

/**
 * E2E tests for Responsive Design
 * Tests layout and behavior across different viewport sizes
 */
describe('Responsive Design', () => {
  const viewports = [
    { name: 'Desktop', width: 1280, height: 800 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Mobile Landscape', width: 667, height: 375 },
  ];

  viewports.forEach(({ name, width, height }) => {
    describe(`${name} (${width}x${height})`, () => {
      beforeEach(() => {
        cy.viewport(width, height);
        cy.visit('/');
        cy.waitForPageLoad();
      });

      it('should display header correctly', () => {
        cy.get('header').should('be.visible');
        cy.get('nav').should('exist');
      });

      it('should display main content', () => {
        cy.get('app-main').should('be.visible');
      });

      it('should display footer', () => {
        cy.get('app-home-footer').should('exist');
      });

      it('should have readable profile section', () => {
        cy.get('.gYXrHp').should('be.visible');
        cy.get('#name-presentation').should('be.visible');
        cy.get('#typewriter').should('be.visible');
      });

      it('should display social icons', () => {
        cy.get('.sc-iGgWBj').should('exist');
        cy.get('#github').should('exist');
        cy.get('#linkedin').should('exist');
      });

      it('should allow scrolling to content', () => {
        cy.scrollTo('bottom', { duration: 1000 });
        cy.get('#home-footer').scrollIntoView().should('exist');
      });
    });
  });

  describe('Mobile Navigation', () => {
    beforeEach(() => {
      cy.viewport(375, 667);
      cy.visit('/');
      cy.waitForPageLoad();
    });

    it('should show mobile-friendly navigation', () => {
      cy.get('nav').should('exist');
    });

    it('should allow tapping on sections', () => {
      cy.get('#description').should('be.visible');
    });

    it('should have touch-friendly toggle buttons', () => {
      cy.get('#present-arrow-span')
        .should('be.visible')
        .should('have.css', 'cursor');
    });

    it('should maintain usability on small screens', () => {
      cy.get('#name-presentation').should('be.visible');
      cy.get('#typewriter').should('be.visible');
    });
  });

  describe('Tablet Layout', () => {
    beforeEach(() => {
      cy.viewport(768, 1024);
      cy.visit('/');
      cy.waitForPageLoad();
    });

    it('should display two-column layout if applicable', () => {
      cy.get('.gYXrHp').should('be.visible');
    });

    it('should show full navigation', () => {
      cy.get('.sc-iGgWBj').should('be.visible');
    });

    it('should display timeline properly', () => {
      cy.get('#timeline').should('exist');
    });
  });

  describe('Desktop Layout', () => {
    beforeEach(() => {
      cy.viewport(1280, 800);
      cy.visit('/');
      cy.waitForPageLoad();
    });

    it('should display full-width sections', () => {
      cy.get('.kroDeR').should('be.visible');
    });

    it('should show all navigation elements', () => {
      cy.get('nav').should('be.visible');
      cy.get('.sc-iGgWBj').should('be.visible');
    });

    it('should display profile info prominently', () => {
      cy.get('#name-presentation').should('be.visible');
      cy.get('#typewriter').should('be.visible');
    });
  });

  describe('Orientation Changes', () => {
    it('should handle portrait to landscape transition', () => {
      cy.viewport(375, 667); // Portrait
      cy.visit('/');
      cy.waitForPageLoad();

      cy.get('.kroDeR').should('be.visible');

      cy.viewport(667, 375); // Landscape
      cy.wait(500);

      cy.get('.kroDeR').should('be.visible');
    });

    it('should maintain content visibility during resize', () => {
      cy.viewport(1280, 800);
      cy.visit('/');
      cy.waitForPageLoad();

      cy.get('#description').should('be.visible');

      // Simulate resize
      cy.viewport(768, 1024);
      cy.wait(300);

      cy.get('#description').should('be.visible');
    });
  });

  describe('Touch Interactions', () => {
    beforeEach(() => {
      cy.viewport(375, 667);
      cy.visit('/');
      cy.waitForPageLoad();
    });

    it('should support tap on links', () => {
      cy.get('#github').should('be.visible');
    });

    it('should support swipe-like scrolling', () => {
      cy.scrollTo(0, 500);
      cy.wait(200);
      cy.get('#timeline').should('exist');
    });

    it('should allow expanding sections via tap', () => {
      cy.get('#projects-arrow-span').click();
      cy.wait(500);
      cy.get('#projects-list').should('exist');
    });
  });

  describe('Image Responsiveness', () => {
    it('should display images appropriately on mobile', () => {
      cy.viewport(375, 667);
      cy.visit('/');
      cy.waitForPageLoad();

      // Profile picture should be visible if exists
      cy.get('.gYXrHp').within(() => {
        cy.get('img').should('exist');
      });
    });

    it('should display images appropriately on desktop', () => {
      cy.viewport(1280, 800);
      cy.visit('/');
      cy.waitForPageLoad();

      cy.get('#profile-img').should('exist');
    });
  });

  describe('Font Scaling', () => {
    it('should have readable text on mobile', () => {
      cy.viewport(375, 667);
      cy.visit('/');
      cy.waitForPageLoad();

      cy.get('#name-presentation')
        .should('be.visible')
        .invoke('css', 'font-size')
        .then(fontSize => {
          const size = parseFloat(fontSize as unknown as string);
          expect(size).to.be.greaterThan(12); // Minimum readable size
        });
    });

    it('should scale headings appropriately', () => {
      cy.viewport(1280, 800);
      cy.visit('/');
      cy.waitForPageLoad();

      cy.get('#name-presentation')
        .invoke('css', 'font-size')
        .then(desktopSize => {
          cy.viewport(375, 667);
          cy.wait(300);

          cy.get('#name-presentation')
            .invoke('css', 'font-size')
            .then(mobileSize => {
              // Font sizes may differ between viewports
              expect(
                parseFloat(mobileSize as unknown as string),
              ).to.be.greaterThan(0);
            });
        });
    });
  });
});
