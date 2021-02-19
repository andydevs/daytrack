/**
 * Track my work hours (temporary)
 * 
 * Author:  Anshul Kharbanda
 * Created: 2 - 18 - 2021
 */
import React, { useEffect, useState } from 'react'

const LOCALSTORAGE_KEY = 'daytrack-state'

function timeFormat(time) {
    if (time) {
        let interval = time.getHours() % 12
        let pm = time.getHours() > 12
        if (interval === 0) { interval = 12 }
        return interval + ':' + time.getMinutes() + ' ' + (pm ? 'PM' : 'AM')
    }
    else {
        return 'Never'
    }
}

export default function App() {
    const [timeOff, setTimeOff] = useState(null)
    const [timeList, setTimeList] = useState([])

    // Load localstorage if it exists
    useEffect(() => {
        let state = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))
        if (state) { 
            if (state.timeOff !== null)
                setTimeOff(new Date(state.timeOff))
            setTimeList(state.timeList)
        }
    }, [])

    // Set localstorage if update
    useEffect(() => {
        let state = { timeOff, timeList }
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(state))
    }, [timeOff, timeList])

    const handleOffWorkClicked = () => {
        if (timeOff === null)  {
            setTimeOff(new Date())
        } else {
            let timeOn = new Date()
            let time = timeOn.getTime() - timeOff.getTime()
            time = Math.round( time / (60 * 1000) ) % (24 * 60)
            setTimeList([...timeList, time])
            setTimeOff(null)
        }
    }

    const handleClear = () => {
        setTimeOff(null)
        setTimeList([])
    }

    const buttontext = timeOff === null 
        ? 'Going off Work'
        : 'Getting back to Work'

    return (
        <div>
            <h1>Day Track</h1>
            <ul>{timeList.map((entry, index) => <li key={index}>{entry} minutes</li>)}</ul>
            <button onClick={handleOffWorkClicked}>{buttontext}</button>
            <button onClick={handleClear}>Clear</button>
            { timeOff && <p>Time at Off: {timeFormat(timeOff)}</p> }
        </div>
    )
}