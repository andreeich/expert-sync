"use client";

import React, { use, useState } from "react";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { SignOutButton, useClerk, useUser } from "@clerk/clerk-react";

import { Input } from "@/components/ui/input";
import { Icon } from "@/components/icon";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { TemplatesDialog } from "./templates-dialog";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebarSheet } from "@/hooks/use-sidebar-sheet";
import { useTemplateDialog } from "@/hooks/use-template-dialog";
import { ArchiveDialog } from "./archive-dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

interface NavItemProps {
  label: string;
  iconVariant?: string;
  onClick?: () => void;
  active?: boolean;
}

const NavItem = React.forwardRef<HTMLButtonElement, NavItemProps>(
  ({ iconVariant, label, onClick, active }: NavItemProps, ref) => {
    return (
      <button
        className={cn(
          "flex items-center py-2 px-3 gap-2 w-full h-10 bg-base-white dark:bg-gray-950 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:shadow-ring-gray transition-all",
          active && "bg-gray-50 dark:bg-gray-800"
        )}
        onClick={onClick}
        ref={ref}
      >
        <span className="flex items-center gap-3 flex-1">
          <Icon
            className="fill-gray-500"
            variant={iconVariant ? iconVariant : "file-04"}
          />
          <span className="text-md/md font-semibold text-gray-700 dark:text-gray-300 line-clamp-1 break-all">
            {label}
          </span>
        </span>
      </button>
    );
  }
);

const NavItemSkeleton = () => {
  return (
    <div className="flex items-center py-2 px-3 gap-3 w-full h-10 bg-base-white dark:bg-gray-950 rounded-md">
      <Skeleton className="w-6 h-6" />
      <Skeleton className="w-20 h-4" />
    </div>
  );
};

NavItem.displayName = "NavItem";

interface NavItemListProps {
  search?: string;
}

const NavItemList = ({ search }: NavItemListProps) => {
  const params = useParams();
  const router = useRouter();
  const documents = useQuery(api.documents.getAllDocuments);
  const sidebarSheet = useSidebarSheet();

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (!documents) {
    return (
      <>
        <NavItemSkeleton />
        <NavItemSkeleton />
      </>
    );
  }

  return (
    <>
      {documents.length ? (
        documents
          .filter((document) => {
            if (!document) return false;
            return search
              ? document.title
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase())
              : true;
          })
          .map((document) => {
            if (!document) return false;
            return (
              <NavItem
                key={document._id}
                label={document.title}
                onClick={() => {
                  onRedirect(document._id);
                  sidebarSheet.onClose();
                }}
                active={params.documentId === document._id}
              />
            );
          })
      ) : (
        <p className="flex items-center py-2 px-3 gap-2 w-full h-10 text-md/md font-semibold text-gray-300 dark:text-gray-700">
          No documents
        </p>
      )}
    </>
  );
};

interface AccountProps {
  className?: string;
}

const Account = ({ className }: AccountProps) => {
  const { user } = useUser();

  return (
    <div
      className={cn(
        "flex gap-4 pl-2 pt-6 items-center justify-between border-t border-gray-200 dark:border-gray-800",
        className
      )}
    >
      <div className="flex gap-3">
        <div className="rounded-full overflow-clip flex-shrink-0">
          <Image
            src={user?.imageUrl || "/avatar-placeholder.svg"}
            width={40}
            height={40}
            alt="user image"
            className="rounded-full"
          />
        </div>
        <div className="w-full">
          <p className="text-sm/sm text-gray-700 dark:text-gray-300 font-semibold line-clamp-1 break-all">
            {user?.fullName || "Anonymous"}
          </p>
          <p className="text-sm/sm text-gray-600 dark:text-gray-400 line-clamp-1 break-all">
            {user?.emailAddresses[0].emailAddress || "anonymous@email.com"}
          </p>
        </div>
      </div>
      <SignOutButton>
        <Button
          variant="tertiary gray"
          size="icon-sm"
          className="flex-shrink-0"
          aria-label="Sign out"
        >
          <Icon variant="log-out-01" className="fill-current w-5 h-5" />
        </Button>
      </SignOutButton>
    </div>
  );
};

Account.Skeleton = function AccountSkeleton() {
  return (
    <div className="flex gap-4 pl-2 pt-6 items-center justify-between border-t border-gray-200 dark:border-gray-800">
      <div className="flex gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="w-full">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-20 h-4" />
        </div>
      </div>
      <Skeleton className="w-10 h-10" />
    </div>
  );
};

const Sidebar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const clerk = useClerk();
  const sidebarSheet = useSidebarSheet();

  const openSettings = () => {
    sidebarSheet.onClose();
    clerk.openUserProfile();
  };

  return (
    <aside className="h-full min-h-[38rem] overflow-y-scroll flex flex-col space-y-5 md:space-y-6 justify-between border-r border-gray-200 dark:border-gray-800 max-h-screen">
      <header className="space-y-5 md:space-y-6 pt-4 md:pt-8">
        <div className="px-4 md:pl-6 md:pr-5 flex justify-between">
          <Link href="/">
            <Image
              src={
                theme.resolvedTheme === "light"
                  ? "/logo.svg"
                  : "/logo-white.svg"
              }
              width={161}
              height={32}
              alt="ExpertSync"
            />
          </Link>
          <ModeToggle />
        </div>
        <div className="px-4 md:px-6">
          <Input
            placeholder="Search"
            className="w-full"
            leadingIcon={<Icon variant="search-lg" className="fill-gray-500" />}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>
      <section className="overflow-y-auto h-full">
        <nav className="px-2 md:px-4">
          <ScrollArea className="max-h-full">
            <div className="space-y-1  h-full">
              <NavItemList search={search} />
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </nav>
      </section>
      <footer className="px-2 space-y-6 md:px-4 pb-8">
        <nav className="space-y-1">
          <TemplatesDialog>
            <NavItem label="New document" iconVariant="plus-circle" />
          </TemplatesDialog>
          <ArchiveDialog>
            <NavItem label="Trash" iconVariant="trash-01" />
          </ArchiveDialog>
          <NavItem
            label="Settings"
            iconVariant="settings-01"
            onClick={openSettings}
          />
        </nav>
        <Account />
      </footer>
    </aside>
  );
};

export { Sidebar };
