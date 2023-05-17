import signUpPage from '../../support/itera/signUpPage'
import baseItera from "../../support/itera/baseItera"
const signUp = require ("../../fixtures/itera/signUp.json")
const baseValue = require ("../../fixtures/itera/baseValue.json")

describe('Verify Sign Up Scenario', () => {
  const SingUpPage = new signUpPage
  const BaseItera = new baseItera
  const faker = require("faker");
  beforeEach(() => {
    cy.visit('/')
    cy.click_signUp(BaseItera.signUpMenu)
    cy.url().should('include', '/UserRegister/NewUser')
  })
  
  it('TC1 Verify user cannot Sign Up with empty fields', () => {
    cy.get(SingUpPage.submitBtn).should('be.visible').click()
    cy.verify_error_msg(SingUpPage.firstNameRequiredMsg, signUp.firstName_error_msg)
    cy.verify_error_msg(SingUpPage.surNameRequiredMsg, signUp.surName_error_msg)
    cy.verify_error_msg(SingUpPage.usernameRequiredMsg, signUp.userName_error_msg)
    cy.verify_error_msg(SingUpPage.passwordRequiredMsg, signUp.password_error_msg)
  })

  it('TC2 Verify user cannot Sign Up with password and confrim password do not match', () => {
    cy.input_data(SingUpPage.firstNameTxt, signUp.firstName)
    cy.input_data(SingUpPage.surNameTxt, signUp.surnName)
    cy.input_data(BaseItera.userNameTxt, baseValue.validUsername)
    cy.input_data(BaseItera.passwordTxt, baseValue.validPassword)
    cy.input_data(SingUpPage.confrimPasswordTxt, baseValue.invalidPassword)
    cy.get(SingUpPage.submitBtn).should('be.visible').click()
    cy.verify_error_msg(SingUpPage.confrim_psw_do_not_match, signUp.password_do_not_match_msg)
  })

  it('TC3 Verify user cannot Sign Up with Username already exist', () => {
    cy.input_data(SingUpPage.firstNameTxt, signUp.firstName)
    cy.input_data(SingUpPage.surNameTxt, signUp.surnName)
    cy.input_data(BaseItera.userNameTxt, signUp.userNameExisted)
    cy.input_data(BaseItera.passwordTxt, baseValue.validPassword)
    cy.input_data(SingUpPage.confrimPasswordTxt, baseValue.validPassword)
    cy.get(SingUpPage.submitBtn).should('be.visible').click()
    cy.verify_error_msg(SingUpPage.userNameExisted, signUp.username_existed_msg)
  })
  
  it('TC4 Verify user success sign up  with filling all the mandatory fields', () => {
    cy.input_data(SingUpPage.firstNameTxt, signUp.firstName)
    cy.input_data(SingUpPage.surNameTxt, signUp.surnName)
    cy.input_data(BaseItera.userNameTxt, faker.random.alphaNumeric(10))
    cy.input_data(BaseItera.passwordTxt, baseValue.validPassword)
    cy.input_data(SingUpPage.confrimPasswordTxt, baseValue.validPassword)
    cy.get(SingUpPage.submitBtn).should('be.visible').click()
    cy.get(SingUpPage.successMsg).should('contain.text',signUp.success_Msg)
  })
})