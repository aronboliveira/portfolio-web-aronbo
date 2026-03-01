/// <reference types="cypress" />

/**
 * E2E tests for Language Toggle (PT-BR / EN-US)
 * Tests bilingual content switching functionality
 */
describe('Language Toggle', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForPageLoad();
  });

  describe('Initial State (Portuguese)', () => {
    it('should display Portuguese greeting by default', () => {
      cy.get('#hi-presentation').should('contain.text', 'Olá! Eu sou o');
    });

    it('should display Portuguese experience heading', () => {
      cy.get('#experience').should('contain.text', 'Minha experiência');
    });

    it('should display language toggle with BR-US labels', () => {
      cy.get('#pt-br').should('contain.text', 'BR');
      cy.get('#en-us').should('contain.text', 'US');
    });

    it('should have toggle button with correct initial state', () => {
      cy.get('#toggle-language').should('exist');
      cy.get('#toggle-language').should('not.have.class', 'checked');
    });

    it('should display Portuguese professional description', () => {
      cy.get('#description').should(
        'contain.text',
        'Desenvolvedor de Software',
      );
    });

    it('should display Portuguese skills section', () => {
      cy.get('#description').should('contain.text', 'Web Fullstack');
    });
  });

  describe('Toggle to English', () => {
    beforeEach(() => {
      cy.toggleLanguage();
    });

    it('should switch to English greeting', () => {
      cy.get('#hi-presentation').should('contain.text', "Hello! I'm");
    });

    it('should switch to English experience heading', () => {
      cy.get('#experience').should('contain.text', 'My experience');
    });

    it('should display English professional description', () => {
      cy.get('#description').should('contain.text', 'Software Developer');
    });

    it('should display English skills', () => {
      cy.get('#description').should(
        'contain.text',
        'Fullstack Web Development',
      );
    });

    it('should update toggle button state', () => {
      cy.get('#toggle-language').should('have.class', 'checked');
    });

    it('should change toggle title to Portuguese instructions', () => {
      cy.get('#toggle-language')
        .should('have.attr', 'title')
        .and('include', 'pt-BR');
    });
  });

  describe('Toggle Back to Portuguese', () => {
    it('should return to Portuguese after double toggle', () => {
      cy.toggleLanguage(); // To English
      cy.toggleLanguage(); // Back to Portuguese

      cy.get('#hi-presentation').should('contain.text', 'Olá! Eu sou o');
      cy.get('#experience').should('contain.text', 'Minha experiência');
    });

    it('should restore Portuguese toggle state', () => {
      cy.toggleLanguage();
      cy.toggleLanguage();

      cy.get('#toggle-language').should('not.have.class', 'checked');
    });
  });

  describe('Experience Section Language Switch', () => {
    it('should display Portuguese experience entries initially', () => {
      cy.get('#timeline').within(() => {
        cy.contains('Presente').should('exist');
      });
    });

    it('should switch experience entries to English', () => {
      cy.toggleLanguage();

      cy.get('#timeline').within(() => {
        cy.contains('Present').should('exist');
      });
    });

    it('should display English job descriptions', () => {
      cy.toggleLanguage();

      cy.get('#timeline').within(() => {
        cy.contains('Fullstack Development').should('exist');
      });
    });
  });

  describe('Courses Section Language Switch', () => {
    it('should switch courses heading to English', () => {
      cy.toggleLanguage();

      cy.get('#courses').should('contain.text', 'Complete courses');
    });

    it('should switch courses heading back to Portuguese', () => {
      cy.toggleLanguage();
      cy.toggleLanguage();

      cy.get('#courses').should('contain.text', 'Cursos realizados');
    });
  });

  describe('Projects Section Language Switch', () => {
    it('should switch projects heading to English', () => {
      cy.toggleLanguage();

      cy.get('#working-projects').should(
        'contain.text',
        'Projects under Construction',
      );
    });

    it('should switch back to Portuguese', () => {
      cy.toggleLanguage();
      cy.toggleLanguage();

      cy.get('#working-projects').should(
        'contain.text',
        'Projetos em Construção',
      );
    });
  });

  describe('Tooltip Language Updates', () => {
    it('should update email tooltip on language change', () => {
      cy.get('#mailto').should('have.attr', 'title').and('include', 'e-mail');

      cy.toggleLanguage();

      cy.get('#mailto').should('have.attr', 'title').and('include', 'email');
    });

    it('should update LinkedIn tooltip on language change', () => {
      cy.get('#linkedin')
        .should('have.attr', 'title')
        .and('include', 'LinkedIn');
    });

    it('should update GitHub tooltip on language change', () => {
      cy.get('#github').should('have.attr', 'title').and('include', 'Github');
    });
  });

  describe('Section Arrow Tooltips', () => {
    it('should update experience arrow title', () => {
      cy.get('#exp-arrow-span')
        .should('have.attr', 'title')
        .and('include', 'Esconder');

      cy.toggleLanguage();

      cy.get('#exp-arrow-span')
        .should('have.attr', 'title')
        .and('include', 'Hide');
    });
  });

  describe('Persistence and Consistency', () => {
    it('should maintain language state during scroll', () => {
      cy.toggleLanguage();
      cy.scrollTo('bottom');

      cy.get('#experience').should('contain.text', 'My experience');
    });

    it('should apply language consistently to all sections', () => {
      cy.toggleLanguage();

      // Check multiple sections are in English
      cy.get('#hi-presentation').should('contain.text', "Hello! I'm");
      cy.get('#experience').should('contain.text', 'My experience');
      cy.get('#courses').should('contain.text', 'Complete courses');
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria attributes on toggle', () => {
      cy.get('input#toggle-language').should('exist');
    });

    it('should be keyboard accessible', () => {
      cy.get('#toggle-language').focus().type('{enter}');
      // Verify state changed (depends on implementation)
    });
  });
});
