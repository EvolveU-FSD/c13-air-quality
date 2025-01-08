"use client"

import { useEffect, useState } from "react"

const aqiLevels = [
    { threshold: 55, label: 'Good', className: 'aqi-good'},
    { threshold: 155, label: 'Moderate', className: 'aqi-moderate'},
    { threshold: 255, label: 'Unhealthy for Sensitve Groups', className: 'aqi-unhealthy-for-sensitive-groups'},
    { threshold: 355, label: 'Unhealthy', className: 'aqi-unhealthy'},
    { threshold: 425, label: 'Very Unhealthy', className: 'aqi-very-unhealthy'},
    { threshold: 1000, label: 'Hazardous', className: 'aqi-hazardous'},
]

function getAqiLabel(aqi) {
    if (aqi === null) return ''
    return aqiLevels.find((level) => aqi<level.threshold).label
}

function getAqiClassName(aqi) {
    if (aqi === null) return ''
    return aqiLevels.find((level) => aqi<level.threshold).className
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