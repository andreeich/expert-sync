import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="w-full bg-base-white dark:bg-gray-950 py-12 z-50 ">
      <div className="container flex flex-col md:flex-row items-center gap-12 md:gap4 md:justify-between">
        <Image src="/logo.svg" width={161} height={32} className="dark:hidden" alt="ExpertSync" />
        <Image
          src="/logo-white.svg"
          width={161}
          height={32}
          className="hidden dark:block"
          alt="ExpertSync"
        />
        <p className="text-md/md text-gray-500">© 2024 ExpertSync. All rights reserved.</p>
      </div>
    </footer>
  );
};
