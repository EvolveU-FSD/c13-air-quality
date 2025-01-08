"use client"

import { useEffect, useState } from "react"

export default function AqiAtLocation() {
    const [currentAqi, setCurrentAqi] = useState({ name: 'Loading...', aqi: null})

    useEffect(() => {
        async function loadAqi() {
            const response = await fetch('/api/aqi')
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
        <div className='aqi'>{currentAqi.aqi}</div>
    </>)
}