import { NextResponse } from "next/server";

let alerts: any[] = [];

export async function POST(request: Request) {
  const alert = await request.json();
  alerts.push(alert);
  return NextResponse.json({ message: "Alert received" }, { status: 200 });
}

export async function GET() {
  return NextResponse.json(alerts, { status: 200 });
}
