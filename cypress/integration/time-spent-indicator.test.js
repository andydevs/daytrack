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

describe('Time Spent Indicator', () => {
    // Time regex
    const timeRegex = /(\d{1,2})\:(\d{2})\s(AM|PM)/

    // Time skips
    const timeSkips = [23, 41, 82, 30, 15, 3, 8, 68, 60, 12]
    const totalHalfHours = 11

    specify('Display sum of minutes list rounded to nearest half hour', () => {
        cy.clock()
        cy.clearLocalStorage()
        cy.visit('/')
        for (const minutes of timeSkips) {
            cy.contains('button', offText).click()
            cy.tick(minutes * millisPerMinute)
            cy.contains('button', onText).click()
        }
        cy.contains(totalHalfHours + ' half-hours').should('exist')
    })
})