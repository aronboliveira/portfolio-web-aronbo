import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
  },
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: 'cypress/component/**/*.cy.ts',
    supportFile: 'cypress/support/component.ts',
  },
});
