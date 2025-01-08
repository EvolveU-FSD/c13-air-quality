import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json({ name: "Calgary", aqi: 143})
}

