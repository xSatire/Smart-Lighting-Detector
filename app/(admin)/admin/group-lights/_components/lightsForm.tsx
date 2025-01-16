"use client";

import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { REGIONS } from "@/constant";
import { onSelectRegion, updateLightsData } from "@/actions/useLights";
import { redirect, useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface groupDataProps {
  groupId: string;
  groupName: string;
  regionId: string;
}

interface lightsDataProps {
  lightsId: string;
  name: string;
  lightsGroupId: string;
  lightsRegion: string;
  status: boolean;
  group: {
    groupName: string;
  };
}

interface lightsFormProps {
  lightsData: lightsDataProps;
  setSelectedLight: Dispatch<SetStateAction<lightsDataProps | null>>;
  router: AppRouterInstance;
}

export const LightsForm = ({
  lightsData,
  setSelectedLight,
  router,
}: lightsFormProps) => {
  const [name, setName] = useState(lightsData.name);
  const [region, setRegion] = useState("");
  const [groupData, setGroupData] = useState<groupDataProps[]>([]);
  const [group, setGroup] = useState("");
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (region) {
      onSelectRegion(region).then((res) => {
        console.log(res);
        if (res) {
          console.log(res);
          setGroupData(res);
        }
      });
    }
  }, [region]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await updateLightsData(lightsData.lightsId, name, group);
      setSelectedLight(null);
      router.refresh();
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto border-0">
      <CardHeader>
        <CardTitle>Lights Form Form</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="region">Region</Label>
            <Select value={region} onValueChange={setRegion} required>
              <SelectTrigger id="region">
                <SelectValue placeholder="Select a region" />
              </SelectTrigger>
              <SelectContent>
                {REGIONS.map((region) => (
                  <SelectItem value={region.id} key={region.id}>
                    {region.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {region && groupData && (
            <div className="space-y-2">
              <Label htmlFor="group">Group</Label>
              <Select value={group} onValueChange={setGroup} required>
                <SelectTrigger id="group">
                  <SelectValue placeholder="Select a group" />
                </SelectTrigger>
                <SelectContent>
                  {groupData.map((group) => (
                    <SelectItem value={group.groupId} key={group.groupId}>
                      {group.groupName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LightsForm;
