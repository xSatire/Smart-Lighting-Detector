import SignInButton from "@/components/auth/signInButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="pt-12">
      <div className="flex items-center justify-center flex-col space-y-4">
        <Button asChild>
          <Link href={"/lighting-detector"}>Light Registration</Link>
        </Button>
        <Button asChild>
          <Link href={"/admin"}>Admin Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
