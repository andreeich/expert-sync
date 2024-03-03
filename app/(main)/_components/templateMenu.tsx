"use client";

import { File, FileText } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface TemplateMenuProps {
  children: React.ReactNode;
  onCreate: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    template?: string
  ) => void;
}

export const TemplateMenu = ({ children, onCreate }: TemplateMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="start"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onClick={(e) => onCreate(e)}>
          <File className="h-4 w-4 mr-2" />
          Clear
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={(e) => onCreate(e, "test")}>
          <FileText className="h-4 w-4 mr-2" />
          Test
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

TemplateMenu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-10 w-10" />;
};
