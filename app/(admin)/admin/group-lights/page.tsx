import React from "react";
import NewLightSelection from "./_components/newLightSelection";
import FilteredLights from "./_components/filterLights";

const page = () => {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <NewLightSelection />
      <FilteredLights />
    </div>
  );
};

export default page;
