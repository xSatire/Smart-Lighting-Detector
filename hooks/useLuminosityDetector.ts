import { url_route } from "@/route";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";

const WEBHOOK_URL = `${url_route}/api/luminosity-alert`; // This will be our mock webhook endpoint

export function useLuminosityDetector() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [luminosity, setLuminosity] = useState<number | null>(null);
  const [hasFlashlight, setHasFlashlight] = useState(false);
  const [isFlashlightOn, setIsFlashlightOn] = useState(false);
  const [deviceId, setDeviceId] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const lastAlertTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isEnabled && videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      console.log("I am here");

      navigator.mediaDevices
        .getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        })
        .then((stream) => {
          video.srcObject = stream;
          streamRef.current = stream;
          video.play();

          const track = stream.getVideoTracks()[0];
          setHasFlashlight("torch" in track.getCapabilities());
        })
        .catch((err) => {
          console.error("Error accessing the camera:", err);
        });

      const calculateLuminosity = () => {
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          let sum = 0;

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const avg = (r + g + b) / 3;
            sum += avg;
          }

          const avgLuminosity = sum / (data.length / 4);
          const roundedLuminosity = Math.round(avgLuminosity * 100) / 100;
          setLuminosity(roundedLuminosity);

          if (hasFlashlight) {
            if (roundedLuminosity < 70 && !isFlashlightOn) {
              toggleFlashlight(true);
            } else if (roundedLuminosity >= 70 && isFlashlightOn) {
              toggleFlashlight(false);
            }
          }

          if (roundedLuminosity < 70) {
            sendAlert(roundedLuminosity);
          }
        }
      };

      const intervalId = setInterval(calculateLuminosity, 1000);

      return () => {
        clearInterval(intervalId);
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
      };
    }
  }, [isEnabled, hasFlashlight, isFlashlightOn, deviceId]);

  const toggleCamera = () => {
    setIsEnabled(!isEnabled);
    if (!isEnabled) {
      setLuminosity(null);
      setIsFlashlightOn(false);
    }
  };

  const toggleFlashlight = (on: boolean) => {
    if (streamRef.current) {
      const track = streamRef.current.getVideoTracks()[0];
      track
        .applyConstraints({
          advanced: [{ torch: on }],
        })
        .then(() => {
          setIsFlashlightOn(on);
        })
        .catch((error) => {
          console.error("Error toggling flashlight:", error);
        });
    }
  };

  const sendAlert = async (luminosityValue: number) => {
    const currentTime = Date.now();
    if (currentTime - lastAlertTimeRef.current >= 10000) {
      // 10 seconds in milliseconds
      try {
        const response = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deviceId,
            luminosity: luminosityValue,
            timestamp: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to send alert");
        }

        lastAlertTimeRef.current = currentTime;
      } catch (error) {
        console.error("Error sending alert:", error);
      }
    }
  };

  return {
    isEnabled,
    luminosity,
    hasFlashlight,
    isFlashlightOn,
    deviceId,
    toggleCamera,
    videoRef,
    canvasRef,
    setDeviceId,
  };
}
