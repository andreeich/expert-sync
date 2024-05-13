"use client";

import { useRouter } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { TemplatesDialog } from "../../_components/templates-dialog";

const DocumentsPage = () => {
  const router = useRouter();
  const isMd = useMediaQuery("(min-width: 768px)");

  return (
    <main className="h-screen md:h-full flex flex-col items-center justify-center gap-8 md:gap-12 container pt-24 pb-12 md:pt-8">
      <div className="flex flex-col text-center items-center gap-4 md:gap-6">
        <h2 className="text-display-md/display-md md:text-display-xl/display-xl font-semibold tracking-tight">
          No documents yet!
        </h2>
        <p className="text-lg/lg md:text-xl/xl text-gray-600 dark:text-gray-400">
          Empty canvas, ready to be filled. Let&apos;s get to work!
        </p>
      </div>
      <div className="flex w-full flex-col md:flex-row gap-3 items-center justify-center">
        <Button
          className="w-full md:w-fit"
          variant="secondary"
          size={isMd ? "2xl" : "xl"}
          onClick={() => router.push("/")}
        >
          <Icon variant="arrow-left" /> Main page
        </Button>
        <TemplatesDialog>
          <Button className="w-full md:w-fit" size={isMd ? "2xl" : "xl"}>
            New document
          </Button>
        </TemplatesDialog>
      </div>
    </main>
  );
};

export default DocumentsPage;
