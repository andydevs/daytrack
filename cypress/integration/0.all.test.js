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

describe('UI Tests', () => {
    // Time regex
    const timeRegex = /(\d{1,2})\:(\d{2})\s(AM|PM)/

    // Time skips
    const timeSkips = [
        23, 41, 82, 30, 
        15, 3, 8, 68, 60, 12]

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
})

describe('Localstorage Tests', () => {
    // Local storage tests
    const localStorageKey = 'daytrack-state'
    const localStorageData = {
        timeList: [10, 21, 22, 14, 31, 3],
        offtime: new Date(2021, 1, 21, 15, 55)
    }

    specify('Loads state of app from localstorage', () => {
        cy.setLocalStorage(localStorageKey, JSON.stringify(localStorageData))
        cy.visit('/')
        for (const minutes of localStorageData.timeList) {
            cy.contains('li', minutes + ' minutes').should('exist')
        }
        cy.contains('Getting back to Work').should('exist')
        cy.contains('3:55 PM').should('exist')
    })
    
    specify('Saves current state to localstorage', () => {
        cy.clearLocalStorage()
        let currentTime = localStorageData.offtime.getTime()
        for (var minutes of localStorageData.timeList) {
            currentTime -= minutes*millisPerMinute
        }
        cy.clock(currentTime)
        cy.visit('/')
        for (var minutes of localStorageData.timeList) {
            cy.contains('button', offText).click()
            cy.tick(minutes*millisPerMinute)
            cy.contains('button', onText).click()
        }
        cy.contains('button', offText).click()
        cy.getLocalStorage(localStorageKey).should(json => {
            let state = JSON.parse(json)
            expect(state).to.be.an('object')
            expect(state).to.have.a.property('timeList')
            expect(state.timeList).to.have.ordered.members(localStorageData.timeList)
            expect(state).to.have.a.property('offtime')
            expect(state.offtime).to.equal(localStorageData.offtime.toISOString())
        })
    })
    
    specify('Make sure time is null in localstorage when not set', () => {
        cy.clearLocalStorage()
        let currentTime = localStorageData.offtime.getTime()
        for (var minutes of localStorageData.timeList) {
            currentTime -= minutes*millisPerMinute
        }
        cy.clock(currentTime)
        cy.visit('/')
        for (var minutes of localStorageData.timeList) {
            cy.contains('button', offText).click()
            cy.tick(minutes*millisPerMinute)
            cy.contains('button', onText).click()
        }
        cy.getLocalStorage(localStorageKey).should(json => {
            let state = JSON.parse(json)
            expect(state).to.be.an('object')
            expect(state).to.have.a.property('timeList')
            expect(state.timeList).to.have.ordered.members(localStorageData.timeList)
            expect(state).to.have.a.property('offtime')
            expect(state.offtime).to.be.null
        })
    })
})