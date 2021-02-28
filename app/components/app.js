/**
 * Track my work hours (temporary)
 * 
 * Author:  Anshul Kharbanda
 * Created: 2 - 18 - 2021
 */
import React, { useEffect, useState } from 'react'

const LOCALSTORAGE_KEY = 'daytrack-state'
const MILLIS_PER_DAY = 86400000

export default function App() {
    const [timestamp, setTimestamp] = useState(Date.now())
    const [offtime, setOfftime] = useState(null)
    const [timeList, setTimeList] = useState([])

    const handleOnOffWork = () => {
        console.log(timestamp)
        if (offtime === null)  {
            setOfftime(new Date())
            setTimestamp(Date.now())
        } else {
            let timeOn = new Date()
            let time = timeOn.getTime() - offtime.getTime()
            time = Math.round( time / (60 * 1000) ) % (24 * 60)
            setTimeList([...timeList, time])
            setOfftime(null)
            setTimestamp(Date.now())
        }
    }

    const handleClear = () => {
        setOfftime(null)
        setTimeList([])
        setTimestamp(Date.now())
    }

    const checkTime = () => {
        if (Date.now() - timestamp >= MILLIS_PER_DAY) {
            handleClear()
        }
    }

    // Load localstorage if it exists
    useEffect(() => {
        let state = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))
        if (state) {
            if (state.offtime !== null)
                setOfftime(new Date(state.offtime))
            setTimestamp(state.timestamp)
            setTimeList(state.timeList)
            checkTime()
        }
    }, [])

    // Set localstorage if update
    useEffect(() => {
        let state = { timestamp, offtime, timeList }
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(state))
    }, [offtime, timeList])

    // Check time every second or so
    useEffect(() => setInterval(checkTime, 1000), [])

    // Time text
    let timetext
    if (offtime) {
        let interval = offtime.getHours() % 12
        let pm = offtime.getHours() > 12
        if (interval === 0) { interval = 12 }
        let minutes = offtime.getMinutes()
        if (minutes < 10) { minutes = '0' + minutes }
        let ampm = pm ? 'PM' : 'AM'
        timetext = interval + ':' + minutes + ' ' + ampm
    }
    else {
        timetext = 'Never'
    }

    const buttontext = offtime === null 
        ? 'Going off Work'
        : 'Getting back to Work'

    return (
        <div>
            <h1>Day Track</h1>
            <ul>{timeList.map((entry, index) => <li key={index}>{entry} minutes</li>)}</ul>
            <button onClick={handleOnOffWork}>{buttontext}</button>
            <button onClick={handleClear}>Clear</button>
            { offtime && <p>Time at Off: {timetext}</p> }
        </div>
    )
}