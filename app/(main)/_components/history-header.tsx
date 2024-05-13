"use client";

import React from "react";

import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import { Icon } from "@/components/icon";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export interface HistoryHeaderProps {
  documentId: Id<"documents">;
}

export const HistoryHeader = ({ documentId }: HistoryHeaderProps) => {
  const document = useQuery(api.documents.getDocumentById, {
    documentId,
  });

  return (
    <header className="flex items-center gap-2 justify-between px-4 md:px-[3.375rem]">
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
      <HoverCard>
        <HoverCardTrigger>
          <Icon variant="help-circle" className="text-gray-600 dark:text-gray-400" />
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="flex flex-col gap-2">
            <span>
              <span className="font-bold">Regular</span> text shows that the{" "}
              <span className="font-bold">block will remain</span>
            </span>
            <span>
              <span className="bg-success-100 text-success-700 dark:bg-success-300 dark:text-success-800 font-bold">
                Green
              </span>{" "}
              text shows that the{" "}
              <span className="bg-success-100 text-success-700 dark:bg-success-300 dark:text-success-800 font-bold">
                block will be added
              </span>
            </span>
            <span>
              <span className="bg-error-100 text-error-700 dark:bg-error-300 dark:text-error-800 font-bold">
                Red
              </span>{" "}
              text shows that the{" "}
              <span className="bg-error-100 text-error-700 dark:bg-error-300 dark:text-error-800 font-bold">
                block will be deleted
              </span>
            </span>
          </div>
        </HoverCardContent>
      </HoverCard>
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
