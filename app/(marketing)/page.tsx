import { BadgeGroup } from "@/components/badge-group";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Navbar } from "./_components/navbar";
import Link from "next/link";
import BackgroundPattern from "./_components/backgroundPattern";

const MarketingPage = () => {
  return (
    <div className="min-h-full flex flex-col pt-20 relative overflow-hidden">
      <BackgroundPattern />
      <div>
        <Navbar />
        <section className="flex flex-col gap-8 pt-16 md:py-24">
          <div className="flex flex-col md:flex-row gap-16 container items-center">
            <div className="space-y-4 md:space-y-6">
              <div className="space-y-4">
                <Link href="/documents">
                  <BadgeGroup>
                    <Badge variant="success">New!</Badge>
                    Accounting records templates
                  </BadgeGroup>
                </Link>
                <h1 className="text-display-md/display-md md:text-display-xl/display-xl font-semibold text-gray-900 dark:text-gray-50">
                  Co-editing documents made easy
                </h1>
              </div>
              <p className="text-lg/lg md:text-xl/xl text-gray-600 dark:text-gray-400">
                Crafted by experts, ExpertSync provides you wiht the tools, insights, and
                breakthrough necessary to elevate your team&apos;s collaborative editing experience.
              </p>
            </div>
            <div className="h-[360px] md:h-[640px] w-full md:w-[512px] relative flex items-start md:items-center justify-center flex-shrink-0">
              <svg
                width="532"
                height="480"
                viewBox="0 0 532 480"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-50 dark:text-gray-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1]"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M182.034 461.691C74.9901 428.768 1.32278 329.846 0.0121784 217.408C-1.15817 117.003 82.1936 43.2414 176.777 10.7273C260.07 -17.9056 346.327 12.9156 406.143 77.7959C484.913 163.236 571.343 274.645 512.702 375.097C449.003 484.212 302.448 498.727 182.034 461.691Z"
                  fill="currentColor"
                />
              </svg>
              <div className="relative w-[61.3%]">
                <Image
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1] w-[90%] dark:hidden"
                  src="/mockup-wrap-light.png"
                  alt="mockup-wrap"
                  width={282}
                  height={610}
                />
                <Image
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1] w-[90%] hidden dark:block"
                  src="/mockup-wrap-dark.png"
                  alt="mockup-wrap"
                  width={282}
                  height={610}
                />
                <Image
                  className="w-full drop-shadow-2xl"
                  src="/iphone-mockup.svg"
                  alt="iphone-mockup"
                  width={314}
                  height={638.5}
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MarketingPage;
