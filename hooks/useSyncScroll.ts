import { useEffect, useRef } from "react";

export function useSyncScroll(dependency: any) {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const leftElement = leftRef.current;
    const rightElement = rightRef.current;

    if (!leftElement || !rightElement) return;

    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();
      rightElement.scrollTop += event.deltaY;
    };

    leftElement.addEventListener("wheel", handleScroll);

    return () => {
      leftElement.removeEventListener("wheel", handleScroll);
    };
  }, [dependency]);

  return { leftRef, rightRef };
}
