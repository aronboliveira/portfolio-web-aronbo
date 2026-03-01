// E2E support file - loaded before each E2E test
import './commands';

// Hide fetch/XHR requests from command log
const app = window.top;
if (app && !app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML = '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-request', '');
  app.document.head.appendChild(style);
}

// Prevent uncaught exceptions from failing tests (optional)
Cypress.on('uncaught:exception', (err, runnable) => {
  // Log the error for debugging
  console.error('Uncaught exception:', err.message);
  // Return false to prevent the error from failing the test
  // You can add conditions here to only ignore specific errors
  if (err.message.includes('ResizeObserver loop')) {
    return false;
  }
  return true;
});

// Before each test
beforeEach(() => {
  // Clear local storage
  cy.clearLocalStorage();
});
