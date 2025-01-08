"use client"

import { useEffect, useState } from "react"

function getAqiLabel(aqi) {
    if (aqi === null) return ''
    if (aqi < 55) return 'Good'
    if (aqi < 155) return 'Moderate'
    if (aqi < 255) return 'Unhealthy for Sensitve Groups'
    if (aqi < 355) return 'Unhealthy'
    if (aqi < 425) return 'Very Unhealthy'
    return 'Hazardous'
}

function getAqiClassName(aqi) {
    if (aqi === null) return ''
    if (aqi < 55) return 'aqi-good'
    if (aqi < 155) return 'aqi-moderate'
    if (aqi < 255) return 'aqi-unhealthy-for-sensitive-groups'
    if (aqi < 355) return 'aqi-unhealthy'
    if (aqi < 425) return 'aqi-very-unhealthy'
    return 'aqi-hazardous'
}

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

    const aqiLabel = getAqiLabel(currentAqi.aqi)
    const aqiClassName = getAqiClassName(currentAqi.aqi)

    console.log("Rendering aqi with class " + aqiClassName)

    return (<div className={`flex items-center justify-center flex-col w-screen h-screen ${aqiClassName}`}>
        <h1>{currentAqi.name}</h1>
        {currentAqi.aqi && <div className='aqi'>{aqiLabel} ({currentAqi.aqi} μg/m³)</div>}  
    </div>)
}