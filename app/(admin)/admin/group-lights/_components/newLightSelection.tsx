import { getLightsByName } from "@/data/lights";
import React from "react";
import LightTable from "./lightTable";

const NewLightSelection = async () => {
  const result = await getLightsByName("Unnamed Light");
  if (!result) return <div>Something went wrong</div>;
  return (
    <div className="w-full space-y-8">
      <div>
        <p className="font-semibold text-2xl">Newly Installed Lights</p>
        {result.length != 0 ? (
          <LightTable lightsData={result!} />
        ) : (
          <p>No new light requests. You are all set!</p>
        )}
      </div>
    </div>
  );
};

export default NewLightSelection;
