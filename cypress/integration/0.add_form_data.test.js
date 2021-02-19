/**
 * Custom stack template stuff
 * 
 * Author:  Anshul Kharbanda
 * Created: [Creation Date]
 */
const entries = require('../fixtures/formentries.json')

specify('Fill out some form items', () => {
    // Visit site
    cy.visit('/')

    // Loop through entries
    for (const entry of entries) {
        cy.get('input[name="name"]')
            .clear()
            .type(entry.name)
        cy.get('textarea[name="thoughts"]')
            .clear()
            .type(entry.thoughts)
        if (entry.like) {
            cy.get('input[name="like"]').click()
        }
        cy.get('#feedback button[type="submit"]').click()
    }

    // Check table
    for (const entry of entries) {
        cy.contains('td', entry.name).should('exist')
        cy.contains('td', entry.thoughts).should('exist')
        cy.contains('td', `${entry.like}`).should('exist')
    }
})