import { NextResponse } from "next/server";

let torchLights: boolean | null = null;

export async function POST(request: Request) {
  const alert = await request.json();
  if (alert == true) {
    torchLights = true;
  } else if (alert == false) {
    torchLights = false;
  } else {
    torchLights = null;
  }
  return NextResponse.json({ message: "Alert received" }, { status: 200 });
}

export async function GET() {
  return NextResponse.json(torchLights, { status: 200 });
}
