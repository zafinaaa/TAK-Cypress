import dashboardPage from "../../support/itera/dashboardPage"
import custDetailsPage from "../../support/itera/custDetailsPage"
import baseItera from "../../support/itera/baseItera"
const customer = require ("../../fixtures/itera/customer.json")
const baseValue = require ("../../fixtures/itera/baseValue.json")

describe('Verify dashboard Scenario', () => {
    const DashboardPage = new dashboardPage
    const CustDetailPage = new custDetailsPage
    const BaseItera = new baseItera
    beforeEach(() => {
        cy.login(baseValue.validUsername,baseValue.validPassword)
    })

    it('TC1 User successfully create new customer', () => {
       cy.get(DashboardPage.createNewCustBtn).should('be.visible').click()
       cy.input_data(DashboardPage.nameTxt, customer.nameCust)
       cy.input_data(DashboardPage.companyTxt, customer.companyCust)
       cy.input_data(DashboardPage.addressTxt, customer.addressCust)
       cy.input_data(DashboardPage.cityTxt, customer.cityCust)
       cy.input_data(DashboardPage.phoneTxt, customer.phoneCust)
       cy.input_data(DashboardPage.emailTxt, customer.emailCust)
       cy.get(DashboardPage.submitBtn).click()
       cy.url().should('include', '/Dashboard')
       cy.scrollTo('bottom')
       cy.get('td').should('contain', customer.nameCust)
       //cy.clearCookies({domain:'itera-qa.azurewebsites.net',log:true,timeout:15000})
       
    })
    
    it('TC2 User successfully search by  customer name and see customer details', () => {
        cy.search_by_cust_name(DashboardPage.searchBox, DashboardPage.searchBtn, customer.nameCust)
        //click button details
        cy.get(DashboardPage.custDetailsBtn).should('be.visible').click()
        cy.url().should('include', '/Customer/Details')
        cy.verify_data(CustDetailPage.custNameField, customer.nameCust)
        cy.verify_data(CustDetailPage.custCompanyField, customer.companyCust)
        cy.verify_data(CustDetailPage.custAddressField, customer.addressCust)
        cy.verify_data(CustDetailPage.custCityField, customer.cityCust)
        cy.verify_data(CustDetailPage.custPhoneField, customer.phoneCust)
        cy.verify_data(CustDetailPage.custEmailField, customer.emailCust)

     })

     it('TC3 User successfully search by customer email and see customer details', () => {
        cy.search_by_cust_email(DashboardPage.searchBox, DashboardPage.searchBtn, customer.emailCust)
        //click button details
        cy.get(DashboardPage.custDetailsBtn).should('be.visible').click()
        cy.url().should('include', '/Customer/Details')
        cy.verify_data(CustDetailPage.custNameField, customer.nameCust)
        cy.verify_data(CustDetailPage.custCompanyField, customer.companyCust)
        cy.verify_data(CustDetailPage.custAddressField, customer.addressCust)
        cy.verify_data(CustDetailPage.custCityField, customer.cityCust)
        cy.verify_data(CustDetailPage.custPhoneField, customer.phoneCust)
        cy.verify_data(CustDetailPage.custEmailField, customer.emailCust)
     })

     it('TC4 User sucessfully edit data customer ', () => {
        cy.search_by_cust_name(DashboardPage.searchBox, DashboardPage.searchBtn, customer.nameCust)
        cy.get(DashboardPage.editBtn).should('be.visible').click()
        cy.url().should('include', '/Customer/Edit')
        cy.edit_data(DashboardPage.nameTxt, customer.editNameCust)
        cy.edit_data(DashboardPage.companyTxt, customer.editCompanyCust)
        cy.edit_data(DashboardPage.addressTxt, customer.editAddressCust)
        cy.edit_data(DashboardPage.cityTxt, customer.editCityCust)
        cy.edit_data(DashboardPage.phoneTxt, customer.editPhoneCust)
        cy.edit_data(DashboardPage.emailTxt, customer.editEmailCust)
        cy.get(DashboardPage.submitBtn).should('be.visible').click()
        cy.url().should('include', '/Dashboard')
        cy.get('td').should('contain.text', customer.editNameCust)
        
     })

     it('TC5 User sucessfully delete data customer ', () => {
      cy.search_by_cust_name(DashboardPage.searchBox, DashboardPage.searchBtn, customer.editNameCust)
      cy.get(DashboardPage.deleteBtn).should('be.visible').click()
      cy.url().should('include', '/Customer/Delete')
      cy.verify_data(CustDetailPage.custNameField, customer.editNameCust)
      cy.verify_data(CustDetailPage.custCompanyField, customer.editCompanyCust)
      cy.verify_data(CustDetailPage.custAddressField, customer.editAddressCust)
      cy.verify_data(CustDetailPage.custCityField, customer.editCityCust)
      cy.verify_data(CustDetailPage.custPhoneField, customer.editPhoneCust)
      cy.verify_data(CustDetailPage.custEmailField, customer.editEmailCust)
      cy.get(DashboardPage.deleteBtn).should('be.visible').click()
      cy.url().should('include', '/Dashboard')
      cy.get(DashboardPage.searchBox).should('be.visible').type(customer.editNameCust)
      cy.get(DashboardPage.searchBtn).should('be.visible').click()
      cy.get('td').should('contain', 'No Match')
   })
   afterEach(() => {
      cy.get(BaseItera.logoutMenu).should('be.visible').click()
      cy.url().should('include', '/Login')
  })
   


})