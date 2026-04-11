/// <reference types="cypress" />

/**
 * E2E tests for Responsive Layout
 * Tests viewport adaptability across desktop, tablet, and mobile
 */
describe('Responsive Layout', () => {
  describe('Desktop (1280x800)', () => {
    beforeEach(() => {
      cy.viewport(1280, 800);
      cy.visit('/en');
      cy.waitForPageLoad();
    });

    it('should display hero section', () => {
      cy.get('.hero').should('be.visible');
    });

    it('should display profile image', () => {
      cy.get('.profile-img').should('be.visible');
    });

    it('should display hero text with name', () => {
      cy.get('.hero-text h1').should('be.visible').and('contain.text', 'Aron');
    });

    it('should display subtitle', () => {
      cy.get('.hero-text .subtitle').should('be.visible');
    });

    it('should display nav icons', () => {
      cy.get('.nav-icon').should('have.length.gte', 3);
    });

    it('should display skills section', () => {
      cy.get('#skills').should('exist');
      cy.get('.skill-item').should('have.length.gt', 0);
    });

    it('should display featured projects', () => {
      cy.get('#featured-projects').should('exist');
      cy.get('.project-card').should('have.length.gt', 0);
    });

    it('should display experience section', () => {
      cy.get('#experience').should('exist');
      cy.get('.timeline-item').should('have.length.gt', 0);
    });

    it('should display courses section', () => {
      cy.get('#courses').should('exist');
    });

    it('should display footer', () => {
      cy.get('.page-footer').should('exist');
    });
  });

  describe('Tablet (768x1024)', () => {
    beforeEach(() => {
      cy.viewport(768, 1024);
      cy.visit('/en');
      cy.waitForPageLoad();
    });

    it('should display hero section', () => {
      cy.get('.hero').should('be.visible');
    });

    it('should display profile image', () => {
      cy.get('.profile-img').should('be.visible');
    });

    it('should display hero text', () => {
      cy.get('.hero-text h1').should('be.visible');
    });

    it('should display nav icons', () => {
      cy.get('.nav-icon').should('have.length.gte', 3);
    });

    it('should display skill items', () => {
      cy.get('.skill-item').should('have.length.gt', 0);
    });

    it('should display project cards', () => {
      cy.get('.project-card').should('have.length.gt', 0);
    });

    it('should display timeline items', () => {
      cy.get('.timeline-item').should('have.length.gt', 0);
    });

    it('should display footer', () => {
      cy.get('.page-footer').should('exist');
    });
  });

  describe('Mobile (375x667)', () => {
    beforeEach(() => {
      cy.viewport(375, 667);
      cy.visit('/en');
      cy.waitForPageLoad();
    });

    it('should display hero section', () => {
      cy.get('.hero').should('be.visible');
    });

    it('should display profile image', () => {
      cy.get('.profile-img').should('be.visible');
    });

    it('should display hero text', () => {
      cy.get('.hero-text h1').should('be.visible');
    });

    it('should display nav icons', () => {
      cy.get('.nav-icon').should('have.length.gte', 3);
    });

    it('should display language switch', () => {
      cy.get('.lang-switch').should('be.visible');
    });

    it('should display CTA button', () => {
      cy.get('.cta-primary').should('be.visible');
    });

    it('should allow scrolling to all sections', () => {
      cy.get('#skills').scrollIntoView().should('be.visible');
      cy.get('#featured-projects').scrollIntoView().should('be.visible');
      cy.get('#experience').scrollIntoView().should('be.visible');
      cy.get('#courses').scrollIntoView().should('be.visible');
    });

    it('should display footer', () => {
      cy.get('.page-footer').scrollIntoView().should('be.visible');
    });
  });

  describe('Mobile Landscape (667x375)', () => {
    beforeEach(() => {
      cy.viewport(667, 375);
      cy.visit('/en');
      cy.waitForPageLoad();
    });

    it('should display hero section', () => {
      cy.get('.hero').should('be.visible');
    });

    it('should display hero text', () => {
      cy.get('.hero-text h1').should('be.visible');
    });

    it('should allow scrolling to skills', () => {
      cy.get('#skills').scrollIntoView().should('be.visible');
    });

    it('should allow scrolling to projects', () => {
      cy.get('#featured-projects').scrollIntoView().should('be.visible');
    });

    it('should display footer at bottom', () => {
      cy.get('.page-footer').scrollIntoView().should('be.visible');
    });
  });

  describe('Portuguese Page Responsive', () => {
    it('should display PT content on mobile', () => {
      cy.viewport(375, 667);
      cy.visit('/pt');
      cy.waitForPageLoad();

      cy.get('.hero-text .subtitle').should(
        'contain.text',
        'Desenvolvedor Full-stack',
      );
      cy.get('#skills-heading').should('contain.text', 'Habilidades');
    });

    it('should display PT content on tablet', () => {
      cy.viewport(768, 1024);
      cy.visit('/pt');
      cy.waitForPageLoad();

      cy.get('#experience-heading').should('contain.text', 'Experiência');
    });
  });

  describe('Scroll Behavior', () => {
    it('should scroll smoothly between sections on desktop', () => {
      cy.viewport(1280, 800);
      cy.visit('/en');
      cy.waitForPageLoad();

      cy.get('#skills').scrollIntoView();
      cy.get('#skills').should('be.visible');

      cy.get('#featured-projects').scrollIntoView();
      cy.get('#featured-projects').should('be.visible');

      cy.get('#experience').scrollIntoView();
      cy.get('#experience').should('be.visible');
    });

    it('should scroll all sections on mobile', () => {
      cy.viewport(375, 667);
      cy.visit('/en');
      cy.waitForPageLoad();

      const sections = [
        '#skills',
        '#featured-projects',
        '#experience',
        '#courses',
      ];
      sections.forEach(sel => {
        cy.get(sel).scrollIntoView().should('be.visible');
      });
    });
  });
});
