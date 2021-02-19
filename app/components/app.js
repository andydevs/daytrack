/**
 * Track my work hours (temporary)
 * 
 * Author:  Anshul Kharbanda
 * Created: 2 - 18 - 2021
 */
import React, { useState } from 'react'

export default function App() {
    const [offWork, setOffWork] = useState(false)

    const toggleOffWork = () => setOffWork(!offWork)

    const buttontext = offWork 
        ? 'Getting back to Work'
        : 'Going off Work'

    return (
        <div>
            <h1>Day Track</h1>
            <ul></ul>
            <button onClick={toggleOffWork}>{buttontext}</button>
        </div>
    )
}