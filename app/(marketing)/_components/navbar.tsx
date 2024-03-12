"use client";

import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import Link from "next/link";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();
  const router = useRouter();
  const theme = useTheme();

  return (
    <div
      className={cn(
        "z-50 bg-base-white dark:bg-gray-950 fixed top-0 w-full h-[4rem] md:h-[5rem] border-b border-gray-200 dark:border-gray-800"
        // scrolled && "border-b border-gray-200 shadow-sm"
      )}
    >
      <div className="container flex items-center justify-between h-full w-full">
        <Button
          variant="tertiary gray"
          size="sm"
          onClick={() => router.push("/")}
        >
          <Image
            src={
              theme.resolvedTheme === "light" ? "/logo.svg" : "/logo-white.svg"
            }
            width={161}
            height={32}
            alt="ExpertSync"
          />
        </Button>
        <div className="md:ml-auto md:justify-end justify-between flex items-center gap-x-2">
          {isLoading && <Spinner />}
          {!isAuthenticated && !isLoading && (
            <>
              <SignInButton mode="modal">
                <Button variant="tertiary gray" size="sm">
                  Log in
                </Button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button size="sm">Register</Button>
              </SignInButton>
            </>
          )}
          {isAuthenticated && !isLoading && (
            <>
              <Button variant="tertiary gray" size="sm" asChild>
                <Link href="/documents">Enter Dashboard</Link>
              </Button>
              <UserButton afterSignOutUrl="/" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
