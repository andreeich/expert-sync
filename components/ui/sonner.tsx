"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      // theme={theme as ToasterProps["theme"]}
      className="toaster group text-sm/sm shadow-sm bg-base-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 font-medium border-gray-200 dark:border-gray-800"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-base-white group-[.toaster]:dark:bg-gray-950 group-[.toaster]:text-gray-900 group-[.toaster]:dark:text-gray-50 group-[.toaster]:border-gray-200 group-[.toaster]:dark:border-gray-800 group-[.toaster]:shadow-lg",
          description:
            "group-[.toast]:text-gray-600 group-[.toast]:dark:text-gray-400",
          actionButton:
            "group-[.toast]:bg-brand-600 group-[.toast]:dark:bg-brand-500  group-[.toast]:text-base-white group-[.toast]:dark:text-gray-50",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:dark:bg-gray-800 group-[.toast]:text-gray-500 group-[.toast]:dark:text-gray-500",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
