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
import { useEffect, useState } from "react";
import { url_route } from "@/route";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

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
    toggleFlashlight,
    isFullyAutomated,
    setIsFullyAutomated,
  } = useLuminosityDetector();
  const { data: session, status } = useSession();
  const [lightsOn, setLightsOn] = useState<boolean | null>(); //To enable automation, you can just disable this

  useEffect(() => {
    console.log(status);
    if (status == "authenticated") {
      setDeviceId(session.user.id!);
    }
  }, [status]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        if (deviceId) {
          const response = await fetch(
            `${url_route}/api/lighting-detector/${deviceId}`
          );
          if (response.ok) {
            const data = await response.json();
            console.log(`API Data for client: ${data}`);
            setLightsOn(data);
          }
        }
      } catch (error) {
        return null;
      }
      // Now fetch if not fully automated
    };
    fetchAlerts();
    const intervalId = setInterval(fetchAlerts, 10000); // Fetch every 10 seconds
    return () => clearInterval(intervalId);
  }, [deviceId]);

  useEffect(() => {
    const toggleFlashLights = async () => {
      if (!isFullyAutomated) {
        console.log(isFullyAutomated);
        if (lightsOn == true) {
          console.log("Switch on lights");
          toggleFlashlight(true);
        } else if (lightsOn == false) {
          console.log("Switch off lights");
          toggleFlashlight(false);
        } else {
          console.log("Awaiting reply");
        }
      }
    };
    toggleFlashLights();
  }, [lightsOn]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="fixed top-4 right-4 flex items-center space-x-2">
        <Switch
          id="toggle-switch"
          checked={isFullyAutomated}
          onCheckedChange={setIsFullyAutomated}
        />
        <Label htmlFor="toggle-switch">
          {isFullyAutomated ? "Automation On" : "Automation Off"}
        </Label>
      </div>
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
                  {isFullyAutomated ? (
                    <AlertDescription>
                      {isFlashlightOn ? "On" : "Off"} (Turns on automatically
                      when luminosity is below 70)
                    </AlertDescription>
                  ) : (
                    <AlertDescription>
                      Awaiting Admin`&apos;`s response
                    </AlertDescription>
                  )}
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
              {lightsOn ? (
                <Alert>Lights is switched on</Alert>
              ) : (
                <Alert>Lights is switched off</Alert>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
