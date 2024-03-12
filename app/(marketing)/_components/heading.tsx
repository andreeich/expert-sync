"use client";

import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/clerk-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-8">
      <div className="space-y-4 ">
        <h1 className="text-display-xl/display-xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">
          Welcome to{" "}
          <span className="underline">Keeem Communication System</span>
        </h1>
        <h3 className="text-display-xs/display-xs font-semibold tracking-tight text-gray-600 dark:text-gray-400">
          ExpertSync is the connected workspace where <br />
          better, faster work happens.
        </h3>
      </div>
      {isAuthenticated && !isLoading && (
        <Button asChild size="2xl">
          <Link href="/documents">Enter Dashboard</Link>
        </Button>
      )}
      {!isAuthenticated && isLoading && (
        <Button disabled size="2xl">
          <Spinner size="lg" />
          Login
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button size="2xl">Login</Button>
        </SignInButton>
      )}
    </div>
  );
};
