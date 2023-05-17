const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    reporter: 'cypress-mochawesome-reporter',
    baseUrl: 'https://itera-qa.azurewebsites.net/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    defaultCommandTimeout: 9000,
    pageLoadTimeout: 30000,
  },
});
