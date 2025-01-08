"use client"

import { useEffect, useState } from "react"

export default function AqiAtLocation() {
    const [currentAqi, setCurrentAqi] = useState({ name: 'Loading...', aqi: null})

    useEffect(() => {
        async function loadAqi() {
            const response = await fetch('/api/aqi?latitude=51&longitude=-114')
            if (response.status !== 200) {
                throw new Error('Fetch of AQI failed')
            }
            const aqi = await response.json()
            setCurrentAqi(aqi)
        }
        loadAqi()
    }, [])

    return (<>
        <h1>{currentAqi.name}</h1>
        {currentAqi.aqi && <div className='aqi'>{currentAqi.aqi} μg/m³</div>}  
    </>)
}