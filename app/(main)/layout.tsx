"use client";

import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { redirect } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { api } from "@/convex/_generated/api";

import { Spinner } from "@/components/spinner";
import { Sidebar } from "./_components/sidebar";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import Navbar from "./_components/navbar";
import useStoreUserEffect from "@/hooks/use-create-user-effect";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const isMd = useMediaQuery("(min-width: 768px)");
  const userId = useStoreUserEffect();

  if (!isAuthenticated && !isLoading) {
    return redirect("/");
  }

  if (isLoading || !userId) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      {isMd ? (
        <ResizablePanelGroup direction="horizontal" className="!overflow-visible !h-auto">
          <ResizablePanel
            className="min-w-[17.5rem] sticky top-0 !overflow-y-scroll !h-screen"
            defaultSize={18}
            maxSize={40}
          >
            <Sidebar />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>{children}</ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <>
          <Navbar />
          {children}
        </>
      )}
    </>
  );
};

export default MainLayout;
