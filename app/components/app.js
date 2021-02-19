/**
 * Track my work hours (temporary)
 * 
 * Author:  Anshul Kharbanda
 * Created: 2 - 18 - 2021
 */
import React, { useState } from 'react'

export default function App() {

    const [offWork, setOffWork] = useState(false)

    return (
        <div>
            <h1>Day Track</h1>
            <ul></ul>
            <button>Going Off Work</button>
        </div>
    )
}