/// <reference types="cypress" />

const SLUGS = [
  'llm-prompt-purify',
  'prossaude-client-app',
  'crm-test',
  'prompt-shape-creator',
];

describe('Case Study Pages — EN', () => {
  SLUGS.forEach(slug => {
    describe(slug, () => {
      beforeEach(() => {
        cy.visit(`/en/projects/${slug}`);
      });

      it(`should load /en/projects/${slug}`, () => {
        cy.url().should('include', `/en/projects/${slug}`);
      });

      it('should display project title in h1', () => {
        cy.get('h1').should('exist').and('not.be.empty');
      });

      it('should display Problem section', () => {
        cy.contains('Problem').should('be.visible');
      });

      it('should display Constraints section', () => {
        cy.contains('Constraints').should('be.visible');
      });

      it('should display Solution section', () => {
        cy.contains('Solution').should('be.visible');
      });

      it('should display Outcome section', () => {
        cy.contains('Outcome').should('be.visible');
      });

      it('should have a back link', () => {
        cy.get('a[href="/en"]').should('exist');
      });

      it('should have external repo link', () => {
        cy.get('a[href*="github.com"]').should('exist');
      });
    });
  });
});

describe('Case Study Pages — PT', () => {
  SLUGS.forEach(slug => {
    it(`should load /pt/projects/${slug}`, () => {
      cy.visit(`/pt/projects/${slug}`);
      cy.url().should('include', `/pt/projects/${slug}`);
      cy.get('h1').should('exist').and('not.be.empty');
    });
  });
});

describe('Case Study — Not Found', () => {
  it('should show empty state for invalid slug', () => {
    cy.visit('/en/projects/non-existent');
    cy.get('.case-study-page').should('not.exist');
  });

  it('should have a back link on not-found', () => {
    cy.visit('/en/projects/non-existent');
    cy.get('a[href="/en"]').should('exist');
  });
});

describe('Case Study Navigation', () => {
  it('should navigate from home to a project', () => {
    cy.visit('/en');
    cy.contains('a', 'LLM Prompt Purify').click();
    cy.url().should('include', '/en/projects/llm-prompt-purify');
    cy.get('h1').should('contain.text', 'LLM Prompt Purify');
  });
});

describe('SEO Meta Tags', () => {
  it('should have correct title on home page', () => {
    cy.visit('/en');
    cy.title().should('include', 'Aron Barbosa');
  });

  it('should have canonical link', () => {
    cy.visit('/en');
    cy.get('link[rel="canonical"]')
      .should('have.attr', 'href')
      .and('include', '/en');
  });

  it('should have hreflang alternates', () => {
    cy.visit('/en');
    cy.get('link[hreflang="en"]').should('exist');
    cy.get('link[hreflang="pt-BR"]').should('exist');
    cy.get('link[hreflang="x-default"]').should('exist');
  });

  it('should have JSON-LD Person schema', () => {
    cy.visit('/en');
    cy.get('script[type="application/ld+json"]').should('exist');
    cy.get('script#jsonld-person')
      .invoke('text')
      .then(text => {
        const data = JSON.parse(text);
        expect(data['@type']).to.eq('Person');
        expect(data.name).to.include('Aron');
      });
  });

  it('should update meta on resume page', () => {
    cy.visit('/en/resume');
    cy.title().should('include', 'Resume');
  });

  it('should update meta on case study page', () => {
    cy.visit('/en/projects/llm-prompt-purify');
    cy.title().should('include', 'LLM Prompt Purify');
  });
});
