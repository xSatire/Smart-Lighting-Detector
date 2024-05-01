"use client";

import Link from "next/link";
import { Button } from "../ui/button";

const SignInButton = () => {
  return (
    <Button variant={"secondary"} asChild>
      <Link href="/sign-in">Sign In</Link>
    </Button>
  );
};

export default SignInButton;
