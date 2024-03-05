"use client";

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

import { Spinner } from "@/components/spinner";
import { SearchCommand } from "@/components/search-command";

import { Navigation } from "./_components/navigation";
import { Sidebar } from "./_components/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="min-w-[17.5rem]" defaultSize={18}>
        <Sidebar />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>{children}</ResizablePanel>
    </ResizablePanelGroup>
    // <div className="h-full flex dark:bg-[#1F1F1F]">
    //   {/* <Navigation /> */}
    //   <Sidebar />
    //   <main className="flex-1 h-full overflow-y-auto">
    //     <SearchCommand />
    //     {children}
    //   </main>
    // </div>
  );
};

export default MainLayout;
