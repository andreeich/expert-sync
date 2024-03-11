"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

import Image from "next/image";

export const Footer = () => {
  const theme = useTheme();

  return (
    <footer className="w-full bg-base-white dark:bg-gray-950 py-12 z-50 ">
      <div className="container flex flex-col md:flex-row items-center gap-12 md:gap4 md:justify-between">
        <Image
          src={theme.theme === "light" ? "/logo.svg" : "/logo-white.svg"}
          width={80}
          height={32}
          alt="KCS"
        />
        <p className="text-md/md text-gray-500">
          © 2024 KCS. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
