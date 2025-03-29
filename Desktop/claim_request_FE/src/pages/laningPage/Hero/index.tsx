import TopBar from "../Topbar/index";
import "./Herro.css";
import { useEffect } from "react";
const ScrollArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-8 w-8 animate-bounce"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);

export default function Herro() {
  useEffect(() => {
    const handleNavLinkClick = (e: Event) => {
      const link = e.currentTarget as HTMLAnchorElement;
      const href = link.getAttribute("href");

      if (href && href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    };
    const handleScrollIndicatorClick = (e: Event) => {
      e.preventDefault();

      const targetElement = document.getElementById("overview");
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    const navLinks = document.querySelectorAll(".nav-link"); //lay all nav links class
    const scrollIndicatorLink = document.querySelector( //svg 
      ".hero-scroll-indicator a",
    );

    navLinks.forEach((link) => {
      link.addEventListener("click", handleNavLinkClick); // add event listener cho tất cả nav link
    });

    if (scrollIndicatorLink) {
      scrollIndicatorLink.addEventListener("click", handleScrollIndicatorClick); // nhu tren
    }

    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleNavLinkClick);
      });

      if (scrollIndicatorLink) {
        scrollIndicatorLink.removeEventListener(
          "click",
          handleScrollIndicatorClick,
        );
      }
    };
  }, []);
  const heroBgImage =
    "url('https://s3-alpha-sig.figma.com/img/ece8/81e1/c879b3ca7917216b0433807c9e221046?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=DA2gYtBvf1STGdOtQiFLttNoLII9PdebMuILxsAMj1y6EloVOEfIKy2rK8~BLPphs2Geew1qOSqROfEEFaMomwRho~7VVgoTA6uJuIxHPU0NhM2IoSa1Piwv34utNIVU116VAdM3O-mco-bSX~GyA1oDFSgA5KLt-aoxTNKFP8octCa5-16mQZo69OgFtPco2juGTIHl-fF9usAw31bAhE-1dVkqdohRl94WVwWwe~bG1NC0lb8HlNFf~rIwaMvceGyRpirOvjG8DJbsgPOtZ8vL0LTOJ0YqubXG-AfgnrxSYUdYFi6q~DkNi6K4JiN1sTXnQPeTzdp7HRMymkBexg__')";

  return (
    <div
      className="font relative h-screen w-full overflow-hidden bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: heroBgImage }}
    >
      <div className="absolute inset-0 z-10 bg-black/50"></div>

      <div className="relative z-20 flex h-full w-full flex-col items-center text-center">
        <div className="w-full flex-shrink-0">
          <TopBar />
        </div>

        <div className="flex flex-grow flex-col items-center justify-center pb-20">
          <h1 className="mb-8 max-w-[800px] text-5xl font-bold">
            Simplify Overtime Claim Management
          </h1>
          <p className="mb-8 max-w-[650px] text-2xl opacity-90">
            ClaimEasy provides an easy-to-use platform for employees and
            managers to handle overtime requests efficiently and transparently.
          </p>

          <button className="font-pixelify cursor-pointer border-2 border-white bg-transparent px-8 py-3 text-lg font-bold text-white transition-colors duration-300 ease-in-out hover:bg-white hover:text-black">
            GET STARTED NOW!
          </button>
        </div>

        <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2">
          <a
            href="#overview"
            className="inline-block text-white"
            onClick={(e) => e.preventDefault()}
          >
            <ScrollArrow />
          </a>
        </div>
      </div>
    </div>
  );
}
