"use client";

import { Icon } from "@/components/icon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useTemplateDialog } from "@/hooks/use-template-dialog";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { useSidebarSheet } from "@/hooks/use-sidebar-sheet";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface TemplateItemProps {
  name: string;
  icon: string;
  content?: string;
  onClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    template: string,
    content?: string,
  ) => void;
  onRemove?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, template: string) => void;
}

const TemplateItem = ({ name, icon, content, onClick, onRemove }: TemplateItemProps) => {
  return (
    <div className="relative w-fit h-fit p-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-lg border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center transition-all text-gray-900 dark:text-gray-50 bg-base-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:shadow-ring-gray-xs outline-none"
            onClick={(e) => onClick(e, name, content)}
          >
            <Icon variant={icon} />
            <p className="text-xs/xs md:text-sm/sm font-semibold line-clamp-2">{name}</p>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
        {onRemove && (
          <Button
            variant="tertiary color"
            size="icon-xs"
            className="absolute right-1 top-1"
            onClick={(e) => onRemove(e, name)}
          >
            <Icon variant="delete" className="w-5 h-5" />
          </Button>
        )}
      </Tooltip>
    </div>
  );
};

TemplateItem.Skeleton = function TemplateItemSkeleton() {
  return (
    <Skeleton className="w-[80px] h-[80px] flex-shrink-0 md:w-[100px] md:h-[100px] rounded-lg border border-gray-200 dark:border-gray-800 bg-base-white dark:bg-gray-950" />
  );
};

interface Template {
  name: string;
  icon: string;
  content?: string;
}

const defaultTemplates: Template[] = [
  {
    name: "Clear",
    icon: "file-04",
    content: "",
  },
];

interface TemplatesDialogProps {
  children: React.ReactNode;
}

const TemplatesDialog = ({ children }: TemplatesDialogProps) => {
  const templateDialog = useTemplateDialog();
  const sidebarSheet = useSidebarSheet();

  const create = useMutation(api.documents.createDocument);
  const removeTemplate = useMutation(api.templates.removeTemplate);
  const userTemplates = useQuery(api.templates.getUserTemplates);
  const router = useRouter();

  const onCreate = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    name?: string,
    content?: string
  ) => {
    event.stopPropagation();
    const promise = create({ template: name, content }).then((documentId) => {
      templateDialog.onClose();
      router.push(`/documents/${documentId}`);
    });

    toast.promise(promise, {
      loading: "Creating a new document...",
      success: "New document created!",
      error: "Failed to create a new document.",
    });
  };

  const onRemove = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    template: string
  ) => {
    event.stopPropagation();
    const promise = removeTemplate({ name: template });

    toast.promise(promise, {
      loading: "Removing template...",
      success: "Template removed!",
      error: "Failed to remove template.",
    });
  };

  return (
    <Dialog open={templateDialog.isOpen} onOpenChange={templateDialog.onToggle}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="p-4 md:p-8"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <header className="space-y-2 pb-3">
          <h3 className="text-display-xs/display-xs md:text-display-sm/display-sm font-semibold tracking-tight text-gray-900 dark:text-gray-50">
            Choose a template
          </h3>
          <p className="text-md/md md:text-sm/sm text-gray-600 dark:text-gray-400">
            Choose one of the existing templates or create a blank document.
          </p>
        </header>

        {defaultTemplates?.length ? (
          <ScrollArea className="w-full">
            <div className="flex gap-4">
              {defaultTemplates.map((template) => (
                <TemplateItem
                  key={template.name}
                  name={template.name}
                  icon={template.icon}
                  content={template.content}
                  onClick={onCreate}
                />
              ))}
              <ScrollBar orientation="horizontal" />
            </div>
          </ScrollArea>
        ) : (
          <p className="text-lg/lg md:text-md/md text-gray-300 dark:text-gray-700 font-medium">
            No templates found.
          </p>
        )}
        {!defaultTemplates && (
          <div className="flex gap-4 overflow-hidden">
            <TemplateItem.Skeleton />
            <TemplateItem.Skeleton />
            <TemplateItem.Skeleton />
            <TemplateItem.Skeleton />
            <TemplateItem.Skeleton />
          </div>
        )}
        <h4 className="text-lg/lg md:text-xl/xl font-semibold text-gray-900 dark:text-gray-50">
          Your templates
        </h4>
        {userTemplates?.length ? (
          <ScrollArea className="w-full">
            <div className="flex gap-4">
              {userTemplates.map((template) => (
                <TemplateItem
                  key={template.name}
                  name={template.name}
                  icon={template.icon}
                  onClick={onCreate}
                  onRemove={onRemove}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <p className="text-lg/lg md:text-md/md text-gray-300 dark:text-gray-700 font-medium">
            No templates found.
          </p>
        )}
        {!userTemplates && (
          <div className="flex gap-4 overflow-hidden">
            <TemplateItem.Skeleton />
            <TemplateItem.Skeleton />
            <TemplateItem.Skeleton />
            <TemplateItem.Skeleton />
            <TemplateItem.Skeleton />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export { TemplatesDialog };
