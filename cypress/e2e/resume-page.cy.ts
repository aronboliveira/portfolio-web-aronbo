/// <reference types="cypress" />

describe('Resume Page — EN', () => {
  beforeEach(() => {
    cy.visit('/en/resume');
  });

  it('should load the resume page', () => {
    cy.url().should('include', '/en/resume');
  });

  it('should have a back link to home', () => {
    cy.get('a[href="/en"]')
      .should('exist')
      .and('have.attr', 'aria-label', 'Back to portfolio home')
      .and('have.attr', 'title', 'Back to portfolio home');
  });

  it('should have a PDF download link', () => {
    cy.get('a[href*=".pdf"]')
      .should('exist')
      .and('have.attr', 'aria-label', 'Download resume PDF')
      .and('have.attr', 'title', 'Download resume PDF');
  });

  it('should display Summary section', () => {
    cy.contains('Summary').should('be.visible');
  });

  it('should display Skills section with key technologies', () => {
    cy.contains('Skills').should('be.visible');
    cy.contains('TypeScript').should('exist');
    cy.contains('Python').should('exist');
    cy.contains('Bash').should('exist');
  });

  it('should display Experience section', () => {
    cy.contains('Experience').should('be.visible');
  });

  it('should display measured impact and Prestech SEO outcomes', () => {
    cy.contains('Measured Impact').should('be.visible');
    cy.contains('+232.9%').should('exist');
    cy.contains('Lighthouse SEO scores reaching 90-100').should('exist');
    cy.contains('1,422 keyword-region rows').should('exist');
    cy.contains('PROSSaúde form workflows').should('exist');
  });

  it('should display GitLab and site/project links', () => {
    cy.get('a[href="https://gitlab.com/aronboliveira"]').should(
      'contain.text',
      'GitLab',
    );
    cy.get('.entry-link a').then($links => {
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

  it('should display Projects section', () => {
    cy.contains('Projects').should('be.visible');
  });

  it('should display Education section', () => {
    cy.contains('Education').should('be.visible');
  });

  it('should use semantic HTML headings', () => {
    cy.get('h2').should('have.length.at.least', 3);
  });
});

describe('Resume Page — PT', () => {
  beforeEach(() => {
    cy.visit('/pt/resume');
  });

  it('should load the PT resume page', () => {
    cy.url().should('include', '/pt/resume');
  });

  it('should display Resumo section', () => {
    cy.contains('Resumo').should('be.visible');
  });

  it('should display Habilidades or Competências section', () => {
    cy.contains(/Habilidades|Competências|Skills/).should('exist');
  });

  it('should display Experiência section', () => {
    cy.contains('Experiência').should('be.visible');
  });

  it('should display Educação or Formação section', () => {
    cy.contains(/Educação|Formação/).should('exist');
  });
});

describe('Resume Navigation', () => {
  it('should navigate from home to resume', () => {
    cy.visit('/en');
    cy.contains('a', 'Resume').first().click();
    cy.url().should('include', '/en/resume');
  });

  it('should navigate back from resume to home', () => {
    cy.visit('/en/resume');
    cy.get('a[href="/en"]').first().click();
    cy.url().should('include', '/en');
    cy.url().should('not.include', '/resume');
  });
});
