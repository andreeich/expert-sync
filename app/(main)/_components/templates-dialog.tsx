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

interface TemplateItemProps {
  name: string;
  icon: string;
  onClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    template: string
  ) => void;
}

const TemplateItem = ({ name, icon, onClick }: TemplateItemProps) => {
  return (
    <button
      className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-lg border border-gray-300 flex flex-col items-center justify-center transition-all text-gray-900 bg-base-white hover:bg-gray-50 focus-visible:shadow-ring-gray-xs outline-none"
      onClick={(e) => onClick(e, name)}
    >
      <Icon variant={icon} />
      <p className="text-xs/xs md:text-sm/sm font-semibold line-clamp-2">
        {name}
      </p>
    </button>
  );
};

TemplateItem.Skeleton = function TemplateItemSkeleton() {
  return (
    <Skeleton className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-lg border border-gray-300 bg-base-white" />
  );
};

interface TemplatesDialogProps {
  children: React.ReactNode;
}

const TemplatesDialog = ({ children }: TemplatesDialogProps) => {
  const templateDialog = useTemplateDialog();

  const create = useMutation(api.documents.createDocument);
  const templates = useQuery(api.templates.getGeneralTemplates);
  const userTemplates = useQuery(api.templates.getUserTemplates);
  const router = useRouter();

  const onCreate = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    template: string
  ) => {
    event.stopPropagation();
    const promise = create({ template }).then((documentId) => {
      templateDialog.onClose();
      router.push(`/documents/${documentId}`);
    });

    toast.promise(promise, {
      loading: "Creating a new document...",
      success: "New document created!",
      error: "Failed to create a new document.",
    });
  };

  return (
    <Dialog open={templateDialog.isOpen} onOpenChange={templateDialog.onToggle}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-4 md:p-8">
        <header className="space-y-2 pb-3">
          <h3 className="text-display-xs/display-xs md:text-display-sm/display-sm font-semibold tracking-tight text-gray-900">
            Choose a template
          </h3>
          <p className="text-md/md md:text-sm/sm text-gray-600">
            Choose one of the existing templates or create a blank document.
          </p>
        </header>

        {templates?.length ? (
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {templates.map((template) => (
              <TemplateItem
                key={template.name}
                name={template.name}
                icon={template.icon}
                onClick={onCreate}
              />
            ))}
          </div>
        ) : (
          <p className="text-lg/lg md:text-md/md text-gray-300 font-medium">
            No templates found.
          </p>
        )}
        {!templates && (
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            <TemplateItem.Skeleton />
            <TemplateItem.Skeleton />
            <TemplateItem.Skeleton />
            <TemplateItem.Skeleton />
            <TemplateItem.Skeleton />
          </div>
        )}
        <h4 className="text-lg/lg md:text-xl/xl font-semibold text-gray-900">
          Your templates
        </h4>
        {userTemplates?.length ? (
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {userTemplates.map((template) => (
              <TemplateItem
                key={template.name}
                name={template.name}
                icon={template.icon}
                onClick={onCreate}
              />
            ))}
          </div>
        ) : (
          <p className="text-lg/lg md:text-md/md text-gray-300 font-medium">
            No templates found.
          </p>
        )}
        {!userTemplates && (
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
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
