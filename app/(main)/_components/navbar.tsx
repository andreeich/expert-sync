import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";
import { useRouter } from "next/navigation";
import { useSidebarSheet } from "@/hooks/use-sidebar-sheet";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sidebarSheet = useSidebarSheet();
  const theme = useTheme();

  const router = useRouter();
  return (
    <header className="h-16 w-full fixed top-0 left-0 bg-base-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 z-[9999]">
      <nav className="flex justify-between items-center gap-2 pl-4 pr-2 py-3 w-full h-full">
        <Button
          variant="tertiary gray"
          size="sm"
          onClick={() => router.push("/")}
        >
          <Image
            src={
              theme.resolvedTheme === "light" ? "/logo.svg" : "/logo-white.svg"
            }
            width={80}
            height={32}
            alt="KCS"
          />
        </Button>
        <Sheet open={sidebarSheet.isOpen} onOpenChange={sidebarSheet.onToggle}>
          <SheetTrigger asChild>
            <Button variant="tertiary gray" size="sm">
              {isMenuOpen ? (
                <Icon variant="x-close" className="animate-in fade-in" />
              ) : (
                <Icon variant="menu-02" className="animate-in face-in" />
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Navbar;
