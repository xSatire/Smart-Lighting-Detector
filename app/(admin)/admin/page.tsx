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
import { updateStatus } from "@/actions/useLights";

interface LuminosityAlert {
  luminosity: any;
  timestamp: any;
  lightsId: string;
  name: string;
  lightsGroupId: string;
  lightsRegion: string;
  status: boolean;
}

export default function AdminDashboard() {
  const [alerts, setAlerts] = useState<LuminosityAlert[]>([]);
  const [filteredAlerts, setFilteredAlerts] = useState<LuminosityAlert[]>([]);
  //Alert helper
  useEffect(() => {
    if (alerts) {
      const userAlertCounts: Record<string, number> = {};
      const result: LuminosityAlert[] = [];

      // Count occurrences of each userId
      alerts.forEach((alert) => {
        userAlertCounts[alert.lightsId] =
          (userAlertCounts[alert.lightsId] || 0) + 1;
        if (userAlertCounts[alert.lightsId] === 4) {
          result.push(alert);
          userAlertCounts[alert.lightsId] === -1000;
        }
      });
      setFilteredAlerts(result);
    }
  }, [alerts]);

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
      if (!response.ok) {
        throw new Error("Failed to send alert");
      } else {
        setFilteredAlerts((alerts) =>
          alerts.map((alert) => {
            if (alert.lightsId == deviceId) {
              return {
                ...alert,
                status: alert.status,
              };
            } else {
              return alert;
            }
          })
        );
        updateStatus(deviceId, message);
      }
    } catch (error) {
      console.error("Error sending alert:", error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 w-full">
      {filteredAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Lights Helper</CardTitle>
            <CardDescription>Helper to identify dark areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-10">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device Name</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Luminosity</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Command</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAlerts.map((alert) => (
                    <TableRow key={alert.lightsId}>
                      <TableCell>{alert.name}</TableCell>
                      <TableCell>{alert.lightsRegion}</TableCell>
                      <TableCell>{alert.luminosity}</TableCell>
                      <TableCell>
                        {new Date(alert.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell className="flex items-center justify-start space-x-4">
                        <Button
                          onClick={() =>
                            handleLightSwitch(alert.lightsId, false)
                          }
                        >
                          Switch off
                        </Button>
                        <Button
                          variant={"outline"}
                          onClick={() =>
                            handleLightSwitch(alert.lightsId, true)
                          }
                        >
                          Switch on
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
      <Card className="w-full mx-auto">
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
                  <TableHead>Device Name</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Luminosity</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.map((alert, index) => (
                  <TableRow key={index}>
                    <TableCell>{alert.name}</TableCell>
                    <TableCell>{alert.lightsRegion}</TableCell>
                    <TableCell>{alert.luminosity}</TableCell>
                    <TableCell>
                      {new Date(alert.timestamp).toLocaleString()}
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
