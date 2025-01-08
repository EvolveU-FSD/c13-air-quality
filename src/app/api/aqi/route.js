import { NextResponse } from "next/server";

export async function GET(request) {
  const latitude = request.nextUrl.searchParams.get('latitude')
  const longitude = request.nextUrl.searchParams.get('longitude')
  const openMeteoResponse = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&hourly=pm10&past_hours=1&forecast_hours=0`)
  if (openMeteoResponse.status !== 200) {
    return NextResponse.error('Open Meteo fetch failed!')
  }
  const openMeteoJson = await openMeteoResponse.json()
  const pm10 = openMeteoJson.hourly.pm10[0]
  return NextResponse.json({ name: "Calgary", aqi: pm10})
}

