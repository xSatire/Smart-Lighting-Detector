import { serverGetLightsFromLightsId } from "@/actions/useLights";
import { NextResponse } from "next/server";

let alerts: any[] = [];

export async function POST(request: Request) {
  try {
    const alert = await request.json();
    if (alert.deviceId) {
      const res = await serverGetLightsFromLightsId(alert.deviceId);
      if (res) {
        const output = {
          ...res,
          luminosity: alert.luminosity,
          timestamp: alert.timestamp,
        };
        alerts.push(output);
      }
    }
    return NextResponse.json({ message: "Alert received" }, { status: 200 });
  } catch (error) {
    console.error("Error in luminosity-alert route:", error);
    NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(alerts, { status: 200 });
}
