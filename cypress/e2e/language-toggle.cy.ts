/// <reference types="cypress" />

/**
 * E2E tests for Language Toggle (PT-BR / EN-US)
 * Tests bilingual content switching via route-based language navigation
 */
describe('Language Toggle', () => {
  describe('English Page', () => {
    beforeEach(() => {
      cy.visit('/en');
      cy.waitForPageLoad();
    });

    it('should display English name', () => {
      cy.get('.hero-text h1').should(
        'contain.text',
        'Aron Barbosa de Oliveira',
      );
    });

    it('should display English subtitle', () => {
      cy.get('.hero-text .subtitle').should(
        'contain.text',
        'Full-Stack Software Developer',
      );
    });

    it('should display English summary', () => {
      cy.get('.hero-text .summary').should(
        'contain.text',
        'internal tools and web applications',
      );
    });

    it('should display English skills heading', () => {
      cy.get('#skills-heading').should('contain.text', 'Skills');
    });

    it('should display English projects heading', () => {
      cy.get('#projects-heading').should('contain.text', 'Featured Projects');
    });

    it('should display English experience heading', () => {
      cy.get('#experience-heading').should('contain.text', 'Experience');
    });

    it('should display English courses heading', () => {
      cy.get('#courses-heading').should('contain.text', 'Courses');
    });

    it('should show PT-BR language switch link', () => {
      cy.get('.lang-switch').should('contain.text', 'PT-BR');
      cy.get('.lang-switch').should('contain.text', 'ES');
    });

    it('should have CTA with View Resume text', () => {
      cy.get('.cta-primary').should('contain.text', 'View Resume');
    });
  });

  describe('Portuguese Page', () => {
    beforeEach(() => {
      cy.visit('/pt');
      cy.waitForPageLoad();
    });

    it('should display Portuguese subtitle', () => {
      cy.get('.hero-text .subtitle').should(
        'contain.text',
        'Desenvolvedor Full-stack',
      );
    });

    it('should display Portuguese summary', () => {
      cy.get('.hero-text .summary').should(
        'contain.text',
        'ferramentas internas e aplicações web',
      );
    });

    it('should display Portuguese skills heading', () => {
      cy.get('#skills-heading').should('contain.text', 'Habilidades');
    });

    it('should display Portuguese projects heading', () => {
      cy.get('#projects-heading').should(
        'contain.text',
        'Projetos em Destaque',
      );
    });

    it('should display Portuguese experience heading', () => {
      cy.get('#experience-heading').should('contain.text', 'Experiência');
    });

    it('should display Portuguese courses heading', () => {
      cy.get('#courses-heading').should('contain.text', 'Cursos');
    });

    it('should show EN-US language switch link', () => {
      cy.get('.lang-switch').should('contain.text', 'EN-US');
      cy.get('.lang-switch').should('contain.text', 'ES');
    });

    it('should have CTA with Ver Currículo text', () => {
      cy.get('.cta-primary').should('contain.text', 'Ver Currículo');
    });
  });

  describe('Toggle EN to PT via Language Switch', () => {
    it('should navigate from EN to PT', () => {
      cy.visit('/en');
      cy.waitForPageLoad();

      cy.get('.lang-switch').contains('PT-BR').click();
      cy.url().should('include', '/pt');
      cy.get('.hero-text .subtitle').should(
        'contain.text',
        'Desenvolvedor Full-stack',
      );
    });
  });

  describe('Toggle PT to EN via Language Switch', () => {
    it('should navigate from PT to EN', () => {
      cy.visit('/pt');
      cy.waitForPageLoad();

      cy.get('.lang-switch').contains('EN-US').click();
      cy.url().should('include', '/en');
      cy.get('.hero-text .subtitle').should(
        'contain.text',
        'Full-Stack Software Developer',
      );
    });
  });

  describe('Experience Section Language', () => {
    it('should show English experience dates', () => {
      cy.visit('/en');
      cy.waitForPageLoad();

      cy.get('.timeline-item')
        .first()
        .within(() => {
          cy.get('time').should('exist');
        });
    });

    it('should show Portuguese experience content', () => {
      cy.visit('/pt');
      cy.waitForPageLoad();

      cy.get('.timeline-item').should('have.length.gt', 0);
    });
  });

  describe('Courses Section Language', () => {
    it('should display English courses heading', () => {
      cy.visit('/en');
      cy.waitForPageLoad();

      cy.get('#courses-heading').should(
        'contain.text',
        'Courses & Certifications',
      );
    });

    it('should display Portuguese courses heading', () => {
      cy.visit('/pt');
      cy.waitForPageLoad();

      cy.get('#courses-heading').should(
        'contain.text',
        'Cursos & Certificações',
      );
    });
  });

  describe('Footer Language', () => {
    it('should show English footer text', () => {
      cy.visit('/en');
      cy.waitForPageLoad();

      cy.get('.page-footer p').should('contain.text', 'All rights reserved');
    });

    it('should show Portuguese footer text', () => {
      cy.visit('/pt');
      cy.waitForPageLoad();

      cy.get('.page-footer p').should(
        'contain.text',
        'Todos os direitos reservados',
      );
    });
  });

  describe('Persistence and Consistency', () => {
    it('should maintain language state during scroll', () => {
      cy.visit('/en');
      cy.waitForPageLoad();

      cy.scrollTo('bottom');
      cy.get('#experience-heading').should('contain.text', 'Experience');
    });

    it('should apply language consistently to all sections', () => {
      cy.visit('/en');
      cy.waitForPageLoad();

      cy.get('#skills-heading').should('contain.text', 'Skills');
      cy.get('#experience-heading').should('contain.text', 'Experience');
      cy.get('#courses-heading').should('contain.text', 'Courses');
    });
  });
});
