"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { TemplateContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { TemplateMenu } from "../../_components/templateMenu";

const DocumentsPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.createWithTemplate);

  const onCreate = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    template?: string
  ) => {
    event.stopPropagation();
    const promise = create({ title: "Untitled", template }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );

    toast.promise(promise, {
      loading: "Creating a new document...",
      success: "New document created!",
      error: "Failed to create a new document.",
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        height="300"
        width="300"
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        height="300"
        width="300"
        alt="Empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Documents
      </h2>
      <TemplateMenu onCreate={onCreate}>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create a document
        </Button>
      </TemplateMenu>
      {/* <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a document
      </Button> */}
    </div>
  );
};

export default DocumentsPage;
