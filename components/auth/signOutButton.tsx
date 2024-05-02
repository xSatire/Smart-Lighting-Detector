"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

const SignOutButton = () => {
  return (
    <Button variant={"secondary"} onClick={() => signOut()} asChild>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
