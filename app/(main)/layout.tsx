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

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user } = useUser();
  const addUser = useMutation(api.users.createUser);
  const [isUserAdded, setIsUserAdded] = useState(false);
  const isMd = useMediaQuery("(max-width: 768px)");

  // TODO: Fix create user on login
  // TODO: change users table to clerk backend sdk using @clerk/nextjs

  useEffect(() => {
    const storageEmail = localStorage.getItem("accountEmail");
    if (isAuthenticated && user) {
      addUser({
        email: user.emailAddresses[0].emailAddress!,
        firstName: user.firstName!,
        lastName: user.lastName!,
        username: user.username!,
        avatarUrl: user?.imageUrl,
      })
        .then(() => {
          localStorage.setItem(
            "accountEmail",
            user.emailAddresses[0].emailAddress!
          );
          setIsUserAdded(true);
        })
        .catch(() => {
          localStorage.removeItem("accountEmail");
          setIsUserAdded(false);
        });
      // if (storageEmail !== user.emailAddresses[0].emailAddress) {
      //   addUser({
      //     email: user.emailAddresses[0].emailAddress!,
      //     firstName: user.firstName!,
      //     lastName: user.lastName!,
      //     username: user.username!,
      //     avatarUrl: user?.imageUrl,
      //   })
      //     .then(() => {
      //       localStorage.setItem(
      //         "accountEmail",
      //         user.emailAddresses[0].emailAddress!
      //       );
      //       setIsUserAdded(true);
      //     })
      //     .catch(() => {
      //       localStorage.removeItem("accountEmail");
      //       setIsUserAdded(false);
      //     });
      // } else {
      //   setIsUserAdded(true);
      // }
    }
  }, [user, isAuthenticated]);

  if (isLoading || isUserAdded) {
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
    <>
      {isMd ? (
        <>
          <Navbar />
          {children}
        </>
      ) : (
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            className="min-w-[17.5rem]"
            defaultSize={18}
            maxSize={40}
          >
            <Sidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>{children}</ResizablePanel>
        </ResizablePanelGroup>
      )}
    </>
  );
};

export default MainLayout;
