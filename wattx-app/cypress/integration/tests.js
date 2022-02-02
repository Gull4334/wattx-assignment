/// <reference types="cypress" />


describe("Render Tests", () => {

    it('Show ALL', () => {
        cy.visit('/');
        cy.wait(5000);
    });

    it('Show 10', () => {
        cy.visit('/');
        cy.wait(5000);
        cy.get('.MuiSelect-select').click();
        cy.get('[data-value="10"]').click();
    });

    it('Show 50', () => {
        cy.visit('/');
        cy.wait(5000);
        cy.get('.MuiSelect-select').click();
        cy.get('[data-value="50"]').click();
    });


    it('Show all and move to Liquidity', () => {
        cy.visit('/');
        cy.wait(5000);
        cy.get('.MuiToolbar-root > :nth-child(2)').click();
        cy.wait(2000);
    });

    it('Show 10 and move to Liquidity', () => {
        cy.visit('/');
        cy.wait(5000);
        cy.get('.MuiSelect-select').click();
        cy.get('[data-value="10"]').click();
        cy.get('.MuiToolbar-root > :nth-child(2)').click();
        cy.wait(2000);
    });

    it('Show 50 and move to Liquidity', () => {
        cy.visit('/');
        cy.wait(5000);
        cy.get('.MuiSelect-select').click();
        cy.get('[data-value="50"]').click();
        cy.get('.MuiToolbar-root > :nth-child(2)').click();
        cy.wait(2000);
    });
   

})


