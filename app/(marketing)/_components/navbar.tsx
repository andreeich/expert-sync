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
        "z-50  fixed top-0 w-full h-[4rem] md:h-[5rem] transition-all",
        scrolled &&
          "bg-base-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-sm",
      )}
    >
      <div className="container flex items-center justify-between h-full w-full">
        <Link href="/">
          <Image src="/logo.svg" width={161} height={32} className="dark:hidden" alt="ExpertSync" />
          <Image
            src="/logo-white.svg"
            width={161}
            height={32}
            className="hidden dark:block"
            alt="ExpertSync"
          />
        </Link>
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
              <Button variant="tertiary gray" size="sm" className="text-right" asChild>
                <Link href="/documents">Enter Dashboard</Link>
              </Button>
              <UserButton afterSignOutUrl="/" />
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
