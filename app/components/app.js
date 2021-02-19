/**
 * Track my work hours (temporary)
 * 
 * Author:  Anshul Kharbanda
 * Created: 2 - 18 - 2021
 */
import React, { useState } from 'react'
import { List } from 'immutable';

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
    const [timeList, setTimeList] = useState(new List())
    const [timeOff, setTimeOff] = useState(null)

    const offWorkClicked = () => {
        if (timeOff === null) 
        {
            setTimeOff(new Date())
        }
        else
        {
            let timeOn = new Date()
            let timediff = timeOn.getTime() - timeOff.getTime()
            timediff = Math.round( timediff / (60 * 1000) ) % (24 * 60)
            setTimeList( timeList.push(timediff) )

            setTimeOff(null)
        }
    }

    const buttontext = timeOff === null 
        ? 'Going off Work'
        : 'Getting back to Work'

    return (
        <div>
            <h1>Day Track</h1>
            <ul>{timeList.map((entry, index) => <li key={index}>{entry} minutes</li>)}</ul>
            <button onClick={offWorkClicked}>{buttontext}</button>
            { timeOff && <p>Time at Off: {timeFormat(timeOff)}</p> }
        </div>
    )
}