import { serverGetLightsFromLightsId } from "@/actions/useLights";
import { NextResponse } from "next/server";

let alerts: any[] = [];

export async function POST(request: Request) {
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
}

export async function GET() {
  return NextResponse.json(alerts, { status: 200 });
}
