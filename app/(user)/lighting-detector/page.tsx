"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";
import { useLuminosityDetector } from "@/hooks/useLuminosityDetector";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function LuminosityDetector() {
  const {
    isEnabled,
    luminosity,
    hasFlashlight,
    isFlashlightOn,
    deviceId,
    toggleCamera,
    videoRef,
    canvasRef,
    setDeviceId,
  } = useLuminosityDetector();
  const { data: session, status } = useSession();
  useEffect(() => {
    console.log(status);
    if (status == "authenticated") {
      setDeviceId(session.user.id!);
    }
  }, [status]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Luminosity Detector</CardTitle>
          <CardDescription>
            Enable camera to detect luminosity and control flashlight
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTitle>Device ID</AlertTitle>
            <AlertDescription>{deviceId}</AlertDescription>
          </Alert>
          <Button onClick={toggleCamera} className="w-full">
            {isEnabled ? "Disable Camera" : "Enable Camera"}
          </Button>
          {isEnabled && (
            <div className="space-y-4">
              <div className="relative aspect-video">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover rounded-md"
                  playsInline
                />
              </div>
              <canvas
                ref={canvasRef}
                className="hidden"
                width="320"
                height="240"
              />
              <div className="text-center">
                <p className="text-lg font-semibold">
                  Average Luminosity:{" "}
                  {luminosity !== null ? `${luminosity}` : "Calculating..."}
                </p>
              </div>
              {hasFlashlight && (
                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertTitle>Flashlight Status</AlertTitle>
                  <AlertDescription>
                    {isFlashlightOn ? "On" : "Off"} (Turns on automatically when
                    luminosity is below 60)
                  </AlertDescription>
                </Alert>
              )}
              {!hasFlashlight && isEnabled && (
                <Alert>
                  <AlertTitle>Flashlight not available</AlertTitle>
                  <AlertDescription>
                    Your device does not support flashlight control or
                    permission was denied.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
