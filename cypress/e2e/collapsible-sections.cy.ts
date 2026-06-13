/// <reference types="cypress" />

/**
 * E2E tests for Collapsible/Interactive Sections
 * Tests the courses toggle and section scrolling
 */
describe('Collapsible Sections', () => {
  beforeEach(() => {
    cy.visit('/en');
    cy.waitForPageLoad();
  });

  describe('Courses Section Toggle', () => {
    it('should display courses section', () => {
      cy.get('#courses').should('exist');
    });

    it('should have courses heading', () => {
      cy.get('#courses-heading').should('contain.text', 'Courses');
    });

    it('should have toggle button for courses', () => {
      cy.get('.toggle-courses').should('exist').and('be.visible');
    });

    it('should show limited courses initially', () => {
      cy.get('.course-item').should('have.length.gt', 0);
    });

    it('should show all courses when toggle is clicked', () => {
      cy.get('.course-item').then($initial => {
        const initialCount = $initial.length;

        cy.get('.toggle-courses').click();
        cy.wait(300);

        cy.get('.course-item').should('have.length.gte', initialCount);
      });
    });

    it('should toggle button text', () => {
      cy.get('.toggle-courses').should('contain.text', 'Show All Courses');

      cy.get('.toggle-courses').click();
      cy.wait(300);

      cy.get('.toggle-courses').should('contain.text', 'Show Less');
    });
  });

  describe('Skills Section', () => {
    it('should display skills section', () => {
      cy.get('#skills').should('exist');
    });

    it('should have skill items', () => {
      cy.get('.skill-item').should('have.length.gt', 0);
    });

    it('should display skills heading', () => {
      cy.get('#skills-heading').should('contain.text', 'Skills');
    });
  });

  describe('Projects Section', () => {
    it('should have featured projects section', () => {
      cy.get('#featured-projects').should('exist');
    });

    it('should display project cards', () => {
      cy.get('.project-card').should('have.length', 4);
    });

    it('should show project stacks', () => {
      cy.get('.stack-tag').should('have.length.gt', 0);
    });

    it('should show project links', () => {
      cy.get('.project-links a').should('have.length.gt', 0);
    });
  });

  describe('Experience Section', () => {
    it('should display experience section', () => {
      cy.get('#experience').should('exist');
    });

    it('should have timeline items', () => {
      cy.get('.timeline-item').should('have.length.gt', 0);
    });

    it('should display experience heading', () => {
      cy.get('#experience-heading').should('contain.text', 'Experience');
    });

    it('should collapse all but the first experience item by default', () => {
      cy.get('.timeline-toggle').should('have.length', 5);
      cy.get('.timeline-toggle').eq(0).should('have.attr', 'aria-expanded', 'true');
      cy.get('.timeline-toggle').eq(1).should('have.attr', 'aria-expanded', 'false');
      cy.get('#experience-content-0').should('be.visible');
      cy.get('#experience-content-1').should('not.be.visible');
      cy.get('#experience-content-4').should('not.be.visible');
    });

    it('should toggle experience panels with WCAG-facing state attributes', () => {
      cy.get('.timeline-toggle')
        .eq(1)
        .should(
          'have.attr',
          'aria-label',
          'Expand experience: University Extension Program PROSSaúde — UFRJ',
        )
        .and('have.attr', 'aria-controls', 'experience-content-1')
        .click();

      cy.get('.timeline-toggle')
        .eq(1)
        .should('have.attr', 'aria-expanded', 'true')
        .and(
          'have.attr',
          'title',
          'Collapse experience: University Extension Program PROSSaúde — UFRJ',
        );
      cy.get('.timeline-toggle').eq(0).should('have.attr', 'aria-expanded', 'false');
      cy.get('#experience-content-1').should('be.visible');
      cy.get('#experience-content-0').should('not.be.visible');
    });

    it('should label experience links as sites or projects', () => {
      cy.get('.timeline-link').then($links => {
        const labels = [...$links].map(link => link.textContent?.trim());
        expect(labels).to.deep.equal([
          'Open Site',
          'Open project',
          'Open project',
          'Open project',
          'Open Site',
        ]);
      });
    });
  });

  describe('Automation Section', () => {
    it('should display automation section', () => {
      cy.get('#automation').should('exist');
    });

    it('should have automation heading', () => {
      cy.get('#automation-heading').should(
        'contain.text',
        'Automation & Productivity',
      );
    });

    it('should have link to my-os-scripts', () => {
      cy.get('#automation a.cta').should('contain.text', 'my-os-scripts');
    });

    it('should include PROSSaúde in the workflow speed impact card', () => {
      cy.get('#automation').should('contain.text', 'including PROSSaúde');
      cy.get('#automation').should('contain.text', 'PROSSaúde forms');
    });
  });

  describe('Scroll Navigation', () => {
    it('should allow scrolling to projects via CTA', () => {
      cy.get('a[href="/en#featured-projects"]').click();
      cy.wait(500);
      cy.get('#featured-projects').should('be.visible');
    });

    it('should allow scrolling to footer', () => {
      cy.scrollTo('bottom', { duration: 1000 });
      cy.get('.page-footer').should('be.visible');
    });
  });

  describe('Responsive Behavior', () => {
    it('should work on tablet viewport', () => {
      cy.viewport(768, 1024);
      cy.visit('/en');
      cy.waitForPageLoad();

      cy.get('.toggle-courses').should('be.visible').click();
      cy.wait(300);
    });

    it('should work on mobile viewport', () => {
      cy.viewport(375, 667);
      cy.visit('/en');
      cy.waitForPageLoad();

      cy.get('.toggle-courses').should('be.visible').click();
      cy.wait(300);
    });
  });
});
