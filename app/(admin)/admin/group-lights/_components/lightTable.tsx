"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LightsForm from "./lightsForm";
import { useRouter } from "next/navigation";

interface lightsDataProps {
  lightsData: {
    lightsId: string;
    name: string;
    lightsGroupId: string;
    lightsRegion: string;
    status: boolean;
    group: {
      groupName: string;
    };
  }[];
}

export default function LightTable({ lightsData }: lightsDataProps) {
  const [selectedLight, setSelectedLight] = useState<
    (typeof lightsData)[0] | null
  >(null);

  const openModal = (light: (typeof lightsData)[0]) => {
    setSelectedLight(light);
  };

  const router = useRouter();

  return (
    <div className="py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Light Name</TableHead>
            <TableHead>Group</TableHead>
            <TableHead>Region</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lightsData.map((light) => (
            <TableRow key={light.lightsId}>
              <TableCell className="font-medium">{light.name}</TableCell>
              <TableCell>{light.group.groupName}</TableCell>
              <TableCell>{light.lightsRegion}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" onClick={() => openModal(light)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Dialogue box here, need to edit */}
      <Dialog
        open={!!selectedLight}
        onOpenChange={() => setSelectedLight(null)}
      >
        <DialogContent>
          {selectedLight && (
            <LightsForm
              lightsData={selectedLight}
              setSelectedLight={setSelectedLight}
              router={router}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
