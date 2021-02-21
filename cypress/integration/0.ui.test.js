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

// Time regex
// TODO: Change it to the actual requirement
const timeRegex = /\d{1,2}\:\d{1,2}\s(AM|PM)/

// Time skips
const timeSkips = [23, 41, 82, 30, 15]

// Time constants
const millisPerMinute = 60000

beforeEach(() => {
    cy.clock()
    cy.clearLocalStorage()
    cy.visit('/')
})

specify('Button text changes appropriately when you click it', () => {
    cy.contains('button', offText)
        .should('exist')
        .click()
        .should('contain', onText)
        .click()
        .should('contain', offText)
})

specify('Time is displayed only when button is on', () => {
    cy.contains('button', offText).click()
    cy.contains(timeRegex).should('exist')
    cy.contains('button', onText).click()
    cy.contains(timeRegex).should('not.exist')
})

specify('Minutes are displayed in list between on off presses of the button', () => {
    cy.contains('button', offText).click()
    cy.tick(timeSkips[0] * millisPerMinute) // Move forward 23 minutes
    cy.contains('button', onText).click()
    cy.contains('23 minutes').should('exist')
})

specify('Each interval between on off cycles will be displayed on the screen', () => {
    for (const minutes of timeSkips) {
        cy.contains('button', offText).click()
        cy.tick(minutes * millisPerMinute)
        cy.contains('button', onText).click()
        cy.contains(minutes + ' minutes').should('exist')
    }
})

specify('Clear button resets work off button', () => {
    cy.contains('button', offText).click()
        .should('contain', onText)
    cy.contains('button', clearText).click()
    cy.contains('button', offText).should('exist')
    cy.contains('button', clearText).click()
    cy.contains('button', offText).should('exist')
})

specify('Clear button removes timer', () => {
    cy.contains('button', offText).click()
    cy.contains(timeRegex).should('exist')
    cy.contains('button', clearText).click()
    cy.contains(timeRegex).should('not.exist')
    cy.contains('button', clearText).click()
    cy.contains(timeRegex).should('not.exist')
})

specify('Clear button clears out minutes list', () => {
    for (const minutes of timeSkips) {
        cy.contains('button', offText).click()
        cy.tick(minutes * millisPerMinute)
        cy.contains('button', onText).click()
        cy.contains(minutes + ' minutes').should('exist')
    }
    cy.contains('button', clearText).click()
    cy.contains(/\d+\sminutes/).should('not.exist')
})