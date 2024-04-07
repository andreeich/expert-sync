"use client";

import React from "react";

import { useMutation, useQuery } from "convex/react";
import { useRef, useState } from "react";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "@/components/ui/input";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { DropdownItem } from "./dropdown-item";
import { MemberItem } from "./member-item";
import { useContent } from "@/hooks/use-content";
import { HistoryDialog } from "./history-dialog";

export interface HistoryHeaderProps {
  documentId: Id<"documents">;
}

export const HistoryHeader = ({ documentId }: HistoryHeaderProps) => {
  const document = useQuery(api.documents.getDocumentById, {
    documentId,
  });

  return (
    <header className="flex items-center gap-2 justify-between px-4 md:px-[3.375rem]">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <h1 className="text-display-xs/display-xs md:text-display-sm/display-sm font-semibold text-gray-900 dark:text-gray-50 line-clamp-1 break-all">
              {document?.title || "Undefined"}
            </h1>
          </TooltipTrigger>
          <TooltipContent>
            <p>{document?.title || "Undefined"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </header>
  );
};

HistoryHeader.Skeleton = function HistoryHeaderSkeleton() {
  return (
    <header className="flex items-center gap-2 justify-between px-4 md:px-[3.375rem]">
      <Skeleton className="w-[7.5rem] h-[2rem] md:h-[2.375rem]" />
    </header>
  );
};
