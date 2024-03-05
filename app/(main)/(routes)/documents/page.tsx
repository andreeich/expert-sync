"use client";

import { useMutation } from "convex/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { TemplatesDialog } from "../../_components/templates-dialog";

const DocumentsPage = () => {
  const router = useRouter();
  const create = useMutation(api.documents.createWithTemplate);
  const isMd = useMediaQuery("(max-width: 768px)");

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
    <main className="h-full flex flex-col items-center justify-center gap-8 md:gap-12 container">
      <div className="flex flex-col text-center items-center gap-4 md:gap-6">
        <h2 className="text-display-md/display-md md:text-display-xl/display-xl font-semibold tracking-tight">
          No documents yet!
        </h2>
        <p className="text-lg/lg md:text-xl/xl text-gray-600">
          Empty canvas, ready to be filled. Let&apos;s get to work!
        </p>
      </div>
      <div className="flex w-full flex-col md:flex-row gap-3 items-center justify-center">
        <Button
          className="w-full md:w-fit"
          variant="secondary"
          size={isMd ? "xl" : "2xl"}
          onClick={() => router.push("/")}
        >
          <Icon variant="arrow-left" /> Main page
        </Button>
        <TemplatesDialog>
          <Button className="w-full md:w-fit" size={isMd ? "xl" : "2xl"}>
            New document
          </Button>
        </TemplatesDialog>
      </div>
    </main>
  );
};

export default DocumentsPage;
