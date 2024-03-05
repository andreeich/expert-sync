import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/icon";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useMutation, useQuery } from "convex/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { TemplatesDialog } from "./templates-dialog";
import { useMemo, useState } from "react";

interface NavItemProps {
  label: string;
  iconVariant?: string;
  onClick?: () => void;
  active?: boolean;
}

const NavItem = ({ iconVariant, label, onClick, active }: NavItemProps) => {
  return (
    <button
      className={cn(
        "flex items-center py-2 px-3 gap-2 w-full h-10 bg-base-white rounded-md hover:bg-gray-50 focus-visible:outline-none focus-visible:shadow-ring-gray transition-all",
        active && "bg-gray-50"
      )}
      onClick={onClick}
    >
      <span className="flex items-center gap-3 flex-1">
        <Icon
          className="fill-gray-500"
          variant={iconVariant ? iconVariant : "file-04"}
        />
        <span className="text-md/md font-semibold text-gray-700">{label}</span>
      </span>
    </button>
  );
};

interface NavItemListProps {
  search?: string;
}

const NavItemList = ({ search }: NavItemListProps) => {
  const params = useParams();
  const router = useRouter();
  const documentsOwn = useQuery(api.documents.getSidebar);
  const documentsShared = useQuery(api.documents.getSharedSidebar);
  const documents = documentsOwn?.concat(documentsShared || []);

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (documents === undefined) {
    return <>Undefiled</>;
  }

  return (
    <>
      {documents.length ? (
        documents
          .filter((document) => {
            return search
              ? document.title
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase())
              : true;
          })
          .map((document) => (
            <NavItem
              key={document._id}
              label={document.title}
              onClick={() => onRedirect(document._id)}
              active={params.documentId === document._id}
            />
          ))
      ) : (
        <p className="flex items-center py-2 px-3 gap-2 w-full h-10 text-md/md font-semibold text-gray-300">
          No documents
        </p>
      )}
    </>
  );
};

interface AccountProps {
  className?: string;
}

const Account = ({ className }: AccountProps) => {
  const { user } = useUser();

  return (
    <div
      className={cn(
        "flex gap-4 pl-2 pt-6 items-center justify-between border-t border-gray-200",
        className
      )}
    >
      <div className="flex gap-3">
        <div className="rounded-full overflow-clip flex-shrink-0">
          {user?.imageUrl ? (
            <Image
              src={user.imageUrl}
              width={40}
              height={40}
              alt="user image"
            />
          ) : (
            <div className="bg-gray-300"></div>
          )}
        </div>
        <div className="w-full">
          <p className="text-sm/sm text-gray-700 font-semibold line-clamp-1 break-all">
            {user?.fullName || "Anonymous"}
          </p>
          <p className="text-sm/sm text-gray-600 line-clamp-1 break-all">
            {user?.emailAddresses[0].emailAddress || "anonymous@email.com"}
          </p>
        </div>
      </div>
      <SignOutButton>
        <Button
          variant="tertiary gray"
          size="icon-sm"
          className="flex-shrink-0"
        >
          <Icon variant="log-out-01" className="fill-current" />
        </Button>
      </SignOutButton>
    </div>
  );
};

const Sidebar = () => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const [search, setSearch] = useState("");
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
    <aside className="h-full flex flex-col justify-between border-r border-gray-200">
      <section className="space-y-6 pt-8">
        <header className="pl-6 pr-5">
          <Image src="/logo.svg" width={80} height={32} alt="KCS" />
        </header>
        <div className="px-6">
          <Input
            placeholder="Search"
            className="w-full"
            leadingIcon={<Icon variant="search-lg" className="fill-gray-500" />}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <nav className="px-4 space-y-1">
          <NavItemList search={search} />
        </nav>
      </section>
      <footer className="space-y-6 px-4 pb-8">
        <nav className="space-y-1">
          <TemplatesDialog>
            <NavItem label="New document" iconVariant="plus-circle" />
          </TemplatesDialog>
          <NavItem label="Settings" iconVariant="settings-01" />
        </nav>
        <Account />
      </footer>
    </aside>
  );
};

export { Sidebar };
