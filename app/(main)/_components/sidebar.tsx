import Image from "next/image";
import logo from "/logo.svg";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/icon";

const Sidebar = () => {
  return (
    <aside>
      <section className="space-y-6 pt-8">
        <header className="pl-6 pr-5">
          <Image src={logo} width={80} height={32} fill alt="KCS" />
        </header>
        <div className="px-6">
          <Input
            placeholder="Search"
            leadingIcon={<Icon variant="search-lg" />}
          />
        </div>
        <nav className="px-4 space-y-1"></nav>
      </section>
      <section></section>
    </aside>
  );
};

export default Sidebar;
