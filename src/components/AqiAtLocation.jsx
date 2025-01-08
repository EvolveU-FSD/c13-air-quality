"use client"

import { useEffect, useState } from "react"

export default function AqiAtLocation() {
    const [userLocation, setUserLocation] = useState()
    const [currentAqi, setCurrentAqi] = useState({ name: 'Loading...', aqi: null})

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log('Got user position', position)
                setUserLocation(position.coords)
            }, () => {
                setCurrentAqi('Location Error')
            })
        }
        else {
            setCurrentAqi('No Location')
        }
    }, [])

    useEffect(() => {
        async function loadAqi() {
            const response = await fetch(`/api/aqi?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}`)
            if (response.status !== 200) {
                throw new Error('Fetch of AQI failed')
            }
            const aqi = await response.json()
            setCurrentAqi(aqi)
        }
        if (userLocation) loadAqi()
    }, [userLocation])

    return (<>
        <h1>{currentAqi.name}</h1>
        {currentAqi.aqi && <div className='aqi'>{currentAqi.aqi} μg/m³</div>}  
    </>)
}