"use client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <div className="bg-[url('../public/background.svg')] bg-cover bg-opacity-90 h-full w-full">
      <div className="bg-gradient-to-br from-blue-400 to-purple-500 opacity-50 h-full w-full fixed"></div>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 z-100">
        <h1 className="text-4xl md:text-6xl font-bold text-black mb-8">
          SMART Lighting
        </h1>
        <Card className="w-full max-w-md bg-white bg-opacity-20 backdrop-blur-lg">
          <CardContent className="flex flex-col gap-4 p-6">
            <Link href="/lighting-detector" passHref>
              <Button
                variant="secondary"
                className="w-full text-lg bg-yellow-100"
              >
                Lighting Detector
              </Button>
            </Link>

            <Link href="/admin" passHref>
              <Button
                variant="secondary"
                className="w-full text-lg bg-yellow-100"
              >
                Admin Dashboard
              </Button>
            </Link>

            <Link href="/login" passHref>
              <Button
                variant="secondary"
                className="w-full text-lg bg-green-100"
              >
                Log In
              </Button>
            </Link>
            <Button
              variant="secondary"
              className="w-full text-lg bg-red-100"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
