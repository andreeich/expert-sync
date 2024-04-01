"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/icon";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, resolvedTheme, theme } = useTheme();
  const isLight = useMemo(
    () => resolvedTheme === "light" || theme === "light",
    [resolvedTheme, theme]
  );

  const toggleTheme = () => {
    if (isLight) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <Button size="icon-sm" variant="tertiary gray" onClick={toggleTheme}>
      {isLight ? (
        <Icon variant="sun" className="animate-in spin-in" />
      ) : (
        <Icon variant="moon-eclipse" className="animate-in spin-in" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
