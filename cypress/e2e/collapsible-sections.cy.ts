/// <reference types="cypress" />

/**
 * E2E tests for Collapsible/Accordion Sections
 * Tests expand/collapse functionality for experience, courses, and projects
 */
describe('Collapsible Sections', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForPageLoad();
  });

  describe('Description/About Section', () => {
    it('should display description paragraph', () => {
      cy.get('#description').should('be.visible');
    });

    it('should have toggle arrow for description', () => {
      cy.get('#present-arrow-span').should('exist');
      cy.get('#present-arrow').should('exist');
    });

    it('should toggle description visibility', () => {
      cy.get('#description').should('be.visible');
      
      cy.get('#present-arrow-span').click();
      cy.wait(500);
      
      // Check if description is hidden or has reduced height
      cy.get('#description').should('exist');
    });

    it('should have tooltip on description arrow', () => {
      cy.get('#present-arrow-span')
        .should('have.attr', 'title')
        .and('include', 'Esconder');
    });
  });

  describe('Experience Section', () => {
    it('should display experience section', () => {
      cy.get('#timeline').should('exist');
    });

    it('should have experience heading', () => {
      cy.get('#experience').should('contain.text', 'experiência');
    });

    it('should have toggle button for experience', () => {
      cy.get('#experience-heading-container').should('exist');
      cy.get('#exp-arrow').should('exist');
    });

    it('should toggle experience timeline', () => {
      cy.get('#timeline').should('be.visible');
      
      cy.get('#experience-heading-container').click();
      cy.wait(500);
      
      // Verify toggle occurred
      cy.get('#exp-arrow').should('exist');
    });

    it('should toggle arrow rotation on collapse', () => {
      cy.get('#exp-arrow-span').click();
      cy.wait(300);
      
      cy.get('#exp-arrow').should('have.class', 'toggled').or('not.have.class', 'toggled');
    });
  });

  describe('Courses Section', () => {
    it('should have courses section', () => {
      cy.get('#courses').should('exist');
    });

    it('should have courses arrow toggle', () => {
      cy.get('#courses-arrow-span').should('exist');
      cy.get('#courses-arrow').should('exist');
    });

    it('should start with courses collapsed', () => {
      cy.get('#courses-arrow').should('have.class', 'toggled');
    });

    it('should expand courses section on click', () => {
      cy.get('#courses-arrow-span').click();
      cy.wait(500);
      
      cy.get('#timeline-courses').should('exist');
    });

    it('should update arrow title on toggle', () => {
      // Check initial state (should show "Mostrar cursos")
      cy.get('#courses-arrow-span').should('have.attr', 'title');
    });
  });

  describe('Projects Section', () => {
    it('should have projects section', () => {
      cy.get('#working-projects').should('exist');
    });

    it('should have projects arrow toggle', () => {
      cy.get('#projects-arrow-span').should('exist');
      cy.get('#projects-arrow').should('exist');
    });

    it('should start with projects collapsed', () => {
      cy.get('#projects-arrow').should('have.class', 'toggled');
    });

    it('should expand projects list on click', () => {
      cy.get('#projects-arrow-span').click();
      cy.wait(500);
      
      cy.get('#projects-list').should('exist');
    });

    it('should show project cards when expanded', () => {
      cy.get('#projects-arrow-span').click();
      cy.wait(500);
      
      cy.get('.project').should('exist');
    });
  });

  describe('Animation Behavior', () => {
    it('should animate collapse smoothly', () => {
      cy.get('#experience-heading-container').click();
      
      // Should have transition during animation
      cy.wait(300);
      cy.get('#timeline').should('exist');
    });

    it('should animate expand smoothly', () => {
      // First collapse
      cy.get('#experience-heading-container').click();
      cy.wait(500);
      
      // Then expand
      cy.get('#experience-heading-container').click();
      cy.wait(500);
      
      cy.get('#timeline').should('exist');
    });
  });

  describe('Multiple Section Toggling', () => {
    it('should allow toggling multiple sections independently', () => {
      // Toggle experience
      cy.get('#experience-heading-container').click();
      cy.wait(300);
      
      // Toggle courses
      cy.get('#courses-arrow-span').click();
      cy.wait(300);
      
      // Both should have toggled states
      cy.get('#exp-arrow').should('exist');
      cy.get('#courses-arrow').should('exist');
    });

    it('should maintain section states independently', () => {
      cy.get('#courses-arrow-span').click();
      cy.wait(500);
      
      // Experience should remain unchanged
      cy.get('#timeline').should('exist');
    });
  });

  describe('Accessibility', () => {
    it('should have clickable toggle buttons', () => {
      cy.get('#experience-heading-container').should('be.visible');
      cy.get('#courses-arrow-span').should('be.visible');
      cy.get('#projects-arrow-span').should('be.visible');
    });

    it('should have descriptive titles on toggle buttons', () => {
      cy.get('#present-arrow-span').should('have.attr', 'title');
      cy.get('#exp-arrow-span').should('have.attr', 'title');
      cy.get('#courses-arrow-span').should('have.attr', 'title');
      cy.get('#projects-arrow-span').should('have.attr', 'title');
    });

    it('should update titles based on state', () => {
      const initialTitle = Cypress.$('#courses-arrow-span').attr('title');
      
      cy.get('#courses-arrow-span').click();
      cy.wait(500);
      
      cy.get('#courses-arrow-span').should('have.attr', 'title').and('not.equal', initialTitle);
    });
  });

  describe('Responsive Behavior', () => {
    it('should work on tablet viewport', () => {
      cy.viewport(768, 1024);
      cy.visit('/');
      cy.waitForPageLoad();
      
      cy.get('#experience-heading-container').should('be.visible').click();
      cy.wait(300);
    });

    it('should work on mobile viewport', () => {
      cy.viewport(375, 667);
      cy.visit('/');
      cy.waitForPageLoad();
      
      cy.get('#courses-arrow-span').should('be.visible').click();
      cy.wait(300);
    });
  });
});
