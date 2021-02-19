/**
 * Track my work hours (temporary)
 * 
 * Author:  Anshul Kharbanda
 * Created: 2 - 18 - 2021
 */
import React, { useState } from 'react'

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

    const offWorkClicked = () => {
        if (timeOff === null) 
        {
            setTimeOff(new Date())
        }
        else
        {
            setTimeOff(null)
        }
    }

    const buttontext = timeOff === null 
        ? 'Going off Work'
        : 'Getting back to Work'

    return (
        <div>
            <h1>Day Track</h1>
            { timeOff && <h2>Last Time off: {timeFormat(timeOff)}</h2> }
            <ul></ul>
            <button onClick={offWorkClicked}>{buttontext}</button>
        </div>
    )
}