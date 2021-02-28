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