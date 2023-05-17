// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
Cypress.Commands.add('click_signUp', (locator) => {
    cy.get(locator).should('be.visible').click()
})

Cypress.Commands.add('click_signIn', (locator) => {
    cy.get(locator).should('be.visible').click()
})

Cypress.Commands.add('verify_error_msg', (locator, text_msg) => {
    cy.get(locator).should('contain.text', text_msg)
})

Cypress.Commands.add('input_data', (locator, value) => {
    cy.get(locator).should('be.visible').type(value)
})

Cypress.Commands.add('login', (username, password) => {
    cy.visit('/')
    cy.get('.form-inline > .navbar-nav > :nth-child(2) > .nav-link').click()
    cy.url().should('include', '/Login')
    cy.get('#Username').should('be.visible').type(username)
    cy.get('#Password').should('be.visible').type(password)
    cy.get('.btn-primary').click()
    cy.get('h3').should('contain', "Welcome zafina13")
})

Cypress.Commands.add('verify_data', (locator, value) => {
    cy.get(locator).should('contain', value)
})

Cypress.Commands.add('search_by_cust_name', (locator1, locator2, value) => {
        cy.get(locator1).should('be.visible').type(value)
        cy.get(locator2).should('be.visible').click()
        cy.get('td').should('contain', value)
        
})

Cypress.Commands.add('search_by_cust_email', (locator1, locator2, value) => {
    cy.get(locator1).should('be.visible').type(value)
    cy.get(locator2).should('be.visible').click()
    cy.get('td').should('contain', value)
    
})

Cypress.Commands.add('verify_data', (locator, value) => {
    cy.get(locator).should('contain', value)
})


Cypress.Commands.add('verify_data_list', (value) => {
    cy.get('td').should('contain', value)
})

Cypress.Commands.add('edit_data', (locator, value) => {
    cy.get(locator).clear().should('be.visible').type(value)
})




//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })