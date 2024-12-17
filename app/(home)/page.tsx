"use client";

import { useSyncScroll } from "@/hooks/useSyncScroll";
import LeftSection from "./_components/leftSection";
import RightSection from "./_components/rightSection";

export default function Portfolio() {
  const { leftRef, rightRef } = useSyncScroll(null);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <LeftSection scrollRef={leftRef} />
      <RightSection scrollRef={rightRef} />
    </div>
  );
}
