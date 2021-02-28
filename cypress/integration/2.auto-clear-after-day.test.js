/**
 * Track my work hours (temporary)
 * 
 * Author:  Anshul Kharbanda
 * Created: 2 - 18 - 2021
 */

// Button texts
const offText = 'Going off Work'
const onText = 'Getting back to Work'
const clearText = 'Clear'

// Time constants
const millisPerMinute = 60000
const millisPerDay = 24*60*millisPerMinute

describe('Auto Clear After Day', () => {
    // Time regex
    const timeRegex = /(\d{1,2})\:(\d{2})\s(AM|PM)/

    // Time skips
    const timeSkips = [
        23, 41, 82, 30, 
        15, 3, 8, 68, 60, 12]

    beforeEach(() => {
        cy.clock()
        cy.visit('/')
    })

    specify('Auto clear on/off state after day', () => {
        cy.contains('button', offText).click()
        cy.contains('button', onText).should('exist')
        cy.contains(timeRegex).should('exist')
        cy.tick(millisPerDay)
        cy.contains(timeRegex).should('not.exist')
        cy.contains('button', offText).should('exist')
        cy.contains('button', onText).should('not.exist')
    })

    specify('Auto clear minutes list after day', () => {
        for (const minutes of timeSkips) {
            cy.contains('button', offText).click()
            cy.tick(minutes*millisPerMinute)
            cy.contains('button', onText).click()
            cy.contains(minutes + ' minutes').should('exist')
        }
        cy.tick(millisPerDay)
        for (const minutes of timeSkips) {
            cy.contains(minutes + ' minutes').should('not.exist')
        }
    })
})