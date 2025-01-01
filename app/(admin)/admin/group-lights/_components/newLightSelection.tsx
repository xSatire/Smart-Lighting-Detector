import { getLightsByName } from "@/data/lights";
import React from "react";
import LightTable from "./lightTable";

const NewLightSelection = async () => {
  const result = await getLightsByName("Unnamed Light");
  if (!result) return <div>Something went wrong</div>;
  return (
    <div>
      <p>Newly Installed Lights</p>
      <LightTable lightsData={result!} />
    </div>
  );
};

export default NewLightSelection;
