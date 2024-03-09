import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1"></main>
      {/* <main className="h-full pt-40">{children}</main> */}
      <Footer />
    </div>
  );
};

export default MarketingLayout;
