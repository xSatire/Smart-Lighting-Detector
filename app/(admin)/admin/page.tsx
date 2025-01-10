"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { url_route } from "@/route";
import { Button } from "@/components/ui/button";

interface LuminosityAlert {
  deviceId: string;
  luminosity: number;
  timestamp: string;
}

export default function AdminDashboard() {
  const [alerts, setAlerts] = useState<LuminosityAlert[]>([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      const response = await fetch(`${url_route}/api/luminosity-alert`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setAlerts(data);
      }
    };

    fetchAlerts();
    const intervalId = setInterval(fetchAlerts, 10000); // Fetch every 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  const handleLightSwitch = async (deviceId: string, message: boolean) => {
    //Remember cannot use server to send api requests
    const url = `${url_route}/api/lighting-detector/${deviceId}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message), //Message is true or false
      });
      console.log(JSON.stringify(message) == "true");

      if (!response.ok) {
        throw new Error("Failed to send alert");
      } else {
        console.log("update");
      }
    } catch (error) {
      console.error("Error sending alert:", error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
          <CardDescription>
            Monitor luminosity alerts from all devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          {alerts.length === 0 ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>No Alerts</AlertTitle>
              <AlertDescription>
                There are currently no luminosity alerts.
              </AlertDescription>
            </Alert>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device ID</TableHead>
                  <TableHead>Luminosity</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.map((alert, index) => (
                  <TableRow key={index}>
                    <TableCell>{alert.deviceId}</TableCell>
                    <TableCell>{alert.luminosity}</TableCell>
                    <TableCell>
                      {new Date(alert.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleLightSwitch(alert.deviceId, true)}
                      >
                        Switch on
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
