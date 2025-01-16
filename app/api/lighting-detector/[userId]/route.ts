import { NextResponse } from "next/server";

let lightsOn: boolean | null = null;

export async function POST(request: Request) {
  try {
    const alert = await request.json();
    if (alert == "true" || alert == true) {
      lightsOn = true;
    } else if (alert == "false" || alert == false) {
      lightsOn = false;
    } else {
      lightsOn = null;
    }
    return NextResponse.json({ message: "Alert received" }, { status: 200 });
  } catch (error) {
    console.error("Error in luminosity-alert route:", error);
    NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(lightsOn, { status: 200 });
}
