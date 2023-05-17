import loginPage from "../../support/itera/loginPage"
import baseItera from "../../support/itera/baseItera"
import dashboardPage from "../../support/itera/dashboardPage"
const login = require ("../../fixtures/itera/login.json")
const baseValue = require ("../../fixtures/itera/baseValue.json")

describe('Verify Login Scenario', () => {
    const LoginPage = new loginPage
    const BaseItera = new baseItera
    const DashboardPage = new dashboardPage 
    
    beforeEach(() => {
        cy.visit('/')
        cy.click_signIn(BaseItera.loginMenu)
        cy.url().should('include', '/Login')
    })
    it('TC1 User Cannot login with empty fields', () => {
        cy.get(LoginPage.loginBtn).should('be.visible').click()
        cy.verify_error_msg(LoginPage.usernameRequiredMsg, login.username_required_msg)
        cy.verify_error_msg(LoginPage.loginFaledMsg, login.login_failed_msg)
        cy.verify_error_msg(LoginPage.passwordRequiredMsg, login.password_required_msg)
    })

    it('TC2 User Cannot login with invalid password', () => {
        
        cy.input_data(BaseItera.userNameTxt, baseValue.validUsername)
        cy.input_data(BaseItera.passwordTxt, baseValue.invalidPassword)
        cy.get(LoginPage.loginBtn).should('be.visible').click()
        cy.verify_error_msg(LoginPage.loginFaledMsg, login.login_failed_msg)
    })

    it('TC3 User Cannot login with username not registered', () => {
        
        cy.input_data(BaseItera.userNameTxt, baseValue.usernameNotRegistered)
        cy.input_data(BaseItera.passwordTxt, baseValue.validPassword)
        cy.get(LoginPage.loginBtn).should('be.visible').click()
        cy.verify_error_msg(LoginPage.loginFaledMsg, login.login_failed_msg)
    })

    it('TC4 User can login with filling valid username and password and logout', () => {

        cy.input_data(BaseItera.userNameTxt, baseValue.validUsername)
        cy.input_data(BaseItera.passwordTxt, baseValue.validPassword)
        cy.get(LoginPage.loginBtn).should('be.visible').click()
        cy.url().should('include', '/Dashboard')
        cy.get(DashboardPage.accountTitle).should('contain', "Welcome zafina13")
        cy.get(BaseItera.logoutMenu).should('be.visible').click()
        cy.url().should('include', '/Login')
    })
    
    
})
