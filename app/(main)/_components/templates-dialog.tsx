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
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const templates = [
  {
    title: "Clear",
    icon: "file-04",
  },
  {
    title: "Meeting Notes",
    template: "test",
    icon: "file-05",
  },
  {
    title: "Project Plan",
    template: "test",
    icon: "file-05",
  },
  {
    title: "Research",
    template: "test",
    icon: "file-05",
  },
  {
    title: "To-do List",
    template: "test",
    icon: "file-05",
  },
];

interface TemplateItemProps {
  title: string;
  template?: string;
  icon?: string;
  onClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    template?: string
  ) => void;
}

const TemplateItem = ({
  title,
  template,
  icon,
  onClick,
}: TemplateItemProps) => {
  return (
    <button
      className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-lg border border-gray-300 flex flex-col items-center justify-center transition-all text-gray-900 bg-base-white hover:bg-gray-50 focus-visible:shadow-ring-gray-xs outline-none"
      onClick={(e) => onClick(e, template)}
    >
      <Icon variant={icon} />
      <p className="text-xs/xs md:text-sm/sm font-semibold line-clamp-2">
        {title}
      </p>
    </button>
  );
};

interface TemplatesDialogProps {
  children: React.ReactNode;
}

const TemplatesDialog = ({ children }: TemplatesDialogProps) => {
  const [open, setOpen] = useState(false);

  const create = useMutation(api.documents.createWithTemplate);
  const router = useRouter();

  const onCreate = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    template?: string
  ) => {
    event.stopPropagation();
    const promise = create({ title: "Untitled", template }).then(
      (documentId) => {
        setOpen(false);
        router.push(`/documents/${documentId}`);
      }
    );

    toast.promise(promise, {
      loading: "Creating a new document...",
      success: "New document created!",
      error: "Failed to create a new document.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <header className="space-y-2 pb-3">
          <h3 className="text-display-xs/display-xs md:text-display-sm/display-sm font-semibold tracking-tight text-gray-900">
            Choose a template
          </h3>
          <p className="text-md/md md:text-sm/sm text-gray-600">
            Choose one of the existing templates or create a blank document.
          </p>
        </header>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {templates.map((template) => (
            <TemplateItem
              key={template.title}
              onClick={onCreate}
              {...template}
            />
          ))}
        </div>
        <h4 className="text-lg/lg md:text-xl/xl font-semibold text-gray-900">
          Your templates
        </h4>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {templates.map((template) => (
            <TemplateItem
              key={template.title}
              onClick={onCreate}
              {...template}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { TemplatesDialog };
