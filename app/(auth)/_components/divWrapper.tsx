"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface divWrapperProp {
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  children: React.ReactNode;
  headerDesc: string;
}

const DivWrapper = ({
  headerLabel,
  headerDesc,
  backButtonLabel,
  backButtonHref,
  children,
}: divWrapperProp) => {
  return (
    <div className="flex justify-center items-center h-full w-full bg-slate-50">
      <div className="flex flex-col space-y-5 py-12 justify-center min-w-[325px] lg:w-[360px]">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-2">
            {headerLabel}
          </h2>{" "}
          <p className="text-balance text-muted-foreground text-sm lg:text-base">
            {headerDesc}
          </p>
        </div>
        {children}
        <Button variant={"link"} asChild>
          <Link href={backButtonHref}>{backButtonLabel}</Link>
        </Button>
      </div>
    </div>
  );
};

export default DivWrapper;
