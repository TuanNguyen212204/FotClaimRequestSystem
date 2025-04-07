import React from "react";
import { motion } from "framer-motion";
import { GlowingEffect } from "../Components/glowing-effect";
import { FileText, CheckCircle2, BellRing } from "lucide-react";
import { Meteors } from "../Components/meteors";
import WorkingProcess from "../Components/WorkingProcess";
import { InfiniteMovingCards } from "../Components/infiniteCards";
import approveImage from "@/assets/Library/Approve.png";
import createImage from "@/assets/Library/Create.png";
import dashboardImage from "@/assets/Library/Dashboard.jpg";
import draftImage from "@/assets/Library/Draft.png";
import financeImage from "@/assets/Library/Finance.png";
import loginImage from "@/assets/Library/Login.png";
import myClaimImage from "@/assets/Library/MyClaim.png";
import pendingImage from "@/assets/Library/Pending.png";
import projectImage from "@/assets/Library/Project.png";
import rejectImage from "@/assets/Library/Reject.png";
import staffImage from "@/assets/Library/Staff.png";
import Experts from "../Components/Experts";
type FeatureCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  imageSrc,
  altText,
}) => {
  return (
    <div className="relative bg-[#3a3f5e] text-left shadow-md transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
      <GlowingEffect
        spread={60}
        glow={true}
        disabled={false}
        proximity={74}
        inactiveZone={0.01}
      />

      <div className="relative flex h-[200px] items-center justify-center bg-white p-6">
        <img
          src={imageSrc}
          alt={altText}
          className="block max-h-full max-w-full object-contain"
        />
      </div>
      <div className="relative overflow-hidden p-6">
        <h3 className="m-0 mb-2 text-xl font-bold">{title}</h3>
        <Meteors number={33} />
        <p className="text-sm leading-relaxed text-[#ced4da]">{description}</p>
      </div>
    </div>
  );
};

export default function Content() {
  const features = [
    {
      title: "User Authentication",
      description:
        "Ensure that users are logged in or authenticated to submit claim requests.",
      imageSrc:
        "https://s3-alpha-sig.figma.com/img/b522/7561/772e70f317690e8bfd4b899f66bcf0c6?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GhCOFm2dvl9azTki7cxCCkdNcobLGSfmLrU8FXvC1NznQbRsJcdzWDThCPDy4t3nS5HfatPNtcKfg18pxXgqWoUjV02qgGkkVnZlbnzC9ProPcOGfVrOYsXtx8d6ldw0QPV7fWyp8-qw-iTcv-zax73ozUgUz7aNX7NpDFMGXe-V5mYm2HKOBrZPH1-M9h-437c82Dk~MPH6wPgSh~XiDAEWS4VIAQgNwKsi6-0esLRboyjn1VamfygRGlsS2~o6Vq0mF2PihPBk3rIq9TD9PCCVba8nR8ZFSv4KtiX9B2mTq-9N8Lozr0zRSr7P4BOpTreTJuNUDWtt3tKgHO6lFg__",
      altText: "Illustration for User Authentication",
    },
    {
      title: "Real-time Tracking",
      description: "Employees can check their claim status anytime.",
      imageSrc:
        "https://s3-alpha-sig.figma.com/img/27ef/0d83/a2f147ee018077e6a64f84b504606edb?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=jbl8fWgktXawnikh1pkLJ0KsPjr3Uec~0k3qxuJeb3xuOqaQCiqziDXQjYgxI3vNxrhPeB6bwMJ6SdsCRE7~NQ~7VgULvOhVxmRVEGb6uhjMFkPZHFrn77FR2hYPp9ekXvbXa94XlKfbvg8G-jlv1XaY99uOD1yx6jLU8nJvOrTX61ZbMeTV4fMkC6MZ9~6q5Hhx-vFRklIN40f8dbr6OPt4L7DcUlVBCzIscDwCl8KUJ0XsY7xs7jIMugWdtlMslWGUA1EvA9cYnNC42FT~oqyAVEw6HiAWbdzNJjFdU~lmGBKak4l3Y~KLUypcanRpb3YjOud9iUf5D~7IKaONxg__",
      altText: "Illustration for Real-time Tracking",
    },
    {
      title: "Claim Submission Form",
      description: "Provide a detailed form for users to submit their claim.",
      imageSrc:
        "https://s3-alpha-sig.figma.com/img/2d1b/164a/260e6da6e7b9eb01a34ac3953382cc50?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=aN4TC77p39H18T540InOl66xSW9Kkdxq3uXXsX6f9ZvM-Q1XwAvIPa7-ARwvc5S1EscELjR~WkLc9e7zDhRxnKQ8cazvpTcpmxbqCfqYjLNtN-FfTOvLAlZ67KwymW2MBQ9L~XwFnV4xChet0RdUeQRpnICheNPngH6K3XxweY1V0b1kOENF4xQW4kqQAySYew9y20DW-~pruN~BXUMdwNtNa75HskvnuqssIhz7yo-sdhUiPlV-KI3KeFsiz2h9IJ3wttBrie2ruX61UW6~6-CLjsIXSEMnTyV~Z9YsilmRsO6zNkUTDacXsPhZUCeuFzkEi7t8FRo81jlBF0O5vA__",
      altText: "Illustration for Claim Submission Form",
    },
    {
      title: "Multi-Level Approval Workflow",
      description:
        "Include approval processes where claims need to go through different levels of review.",
      imageSrc:
        "https://s3-alpha-sig.figma.com/img/5285/9553/aebe8607ad85a965578f8f0f88238c9c?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=cDL~NcU43GxHrRPwJ6qBbKgZxxdAlUpWlcGDIG-3sYE0MagXf1oXY8v8unOEOmxFxyIVuaB~8xkpmMuVs1xqNsar5ZfKxrP9h4SLSMMbx71hLW4aidJNUYFAYpxWDnqCOJIv259JjM-3xhPktURe1yAi-CtuaEm~yHI-5QpZ9iNJOpE~CyR3cKxYyqszv52FT9l3lksM~CbTK0t6Q~HaFj3zTZqqhwJ1EUhA7wL~WHxow28mb-JZe3hCD6PYEfCkNwPTHXVUtt~fZWZN0VEDD0kqlCODMn5HdqUfjV5sNDW~qC0SEcJnH3h-VcP6kLd7x~98W6azbU~i-Dlk6p-IYg__",
      altText: "Illustration for Multi-Level Approval Workflow",
    },
    {
      title: "Automated Notifications",
      description:
        "Send automated email or in-app notifications to users regarding claim status updates.",
      imageSrc:
        "https://s3-alpha-sig.figma.com/img/7977/dd22/f160639f86428dfb7f8ac8c8f058969a?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dJvE0Q4-SPmVDuYZYqzAkiTKxjLFLBndIQuYplfwqrqkqJ2yI5b84kdgcPfJ49SIxJjSBfFw6WQdyi9ottD9Qde6Oj5jHqAhsDhTpp7DJ-In2hg42QgoISEwOZhCzS5s5ne7oSMhFap2ZVZTiYuDdF-yudpOfXLh3N2fzSKN57APlutOWGnsQLl8yGOMz-l9DbUfPhLOZ-RTLKhGFO2meJX0gfqrLXvxMWcF0QXh61XxHIL0ChYVhdM46oGZLmJ1Ll9lul8OeDC7eV5BxB23yvyfl-UhOL8pVasD9wGFToCM5p86mIrxa76rCO053C4Eeeu9EdCWnHC7O5-ykFF-Ew__",
      altText: "Illustration for Automated Notifications",
    },
    {
      title: "Secure & Role-Based Access",
      description: "Ensures that only authorized personnel can manage claims.",
      imageSrc:
        "https://s3-alpha-sig.figma.com/img/aa24/439f/3709e5be7bd698275d7a5cf7cb0601e2?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qfgEpR1Ym-4LX7aS-Ra8Wc6WuuKIqeeOEw-g32aLqNcFS8-2whBMvdthN~smrPM5phmJLPb3olZtN~z2STaWnKOq-HVOAk0JOLe6OZ66m8qRmj3HQ9eFXpqnSHDTfYeEP7Ycj9ehCBFCRRHAXZGGbL0mVZL34d038j9uOoaEC2UyNArAEqm6b69kN-zuZGmHnmFCKKexOhMTyAVEnXn5LI4FkzWGW6e0gIxSRTnycUGp4D1~b0r4X8~uj0JMlk4IK0ms2V3p2UVbPA4q5BbA9RWA3kEnEqY7QV8lUiZT3~l78DfO3OCeSr26-d7Rvyt7l2lGg7xXlUWaa7vBnycduw__",
      altText: "Illustration for Secure & Role-Based Access",
    },
  ];

  return (
    <>
      <section
        id="overview"
        className="flex w-full flex-col items-center justify-center overflow-hidden bg-[#2d3142] py-16 text-white"
      >
        <div className="text flex max-w-[800px] flex-col px-4 text-center">
          <h1 className="mb-6 text-5xl font-bold">Overtime Claims Made Easy</h1>
          <p className="mb-6 text-base opacity-90">
            Stop wasting time with inefficient, error-prone manual overtime
            claims. ClaimEasy provides a simple, transparent platform for
            employees to submit requests and managers to approve them quickly.
          </p>
          <p>
            Streamline your workflow and ensure everyone is on the same page.
          </p>
        </div>
      </section>
      <section
        id="feature"
        className="w-full overflow-hidden bg-[#2d3142] py-16 text-white"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="mb-10 text-center text-5xl font-bold">Features</h1>{" "}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                imageSrc={feature.imageSrc}
                altText={feature.altText}
              />
            ))}
          </div>
        </div>
      </section>
      <section
        id="how-it-works"
        className="bg-gray-800 py-16 text-center text-white"
      >
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-5xl font-bold">How ClaimEasy Works</h2>
          <p className="mx-auto mb-12 max-w-5xl text-lg text-gray-300">
            Get your overtime claims submitted and approved in just a few simple
            steps.
          </p>

          <div className="mt-12 flex flex-col items-center justify-around gap-8 md:flex-row md:items-start">
            <div className="w-full max-w-md p-6 text-center md:max-w-[320px] md:min-w-[250px] md:flex-1">
              <div className="mb-6 inline-flex h-[70px] w-[70px] items-center justify-center rounded-full bg-indigo-600">
                <FileText className="h-[35px] w-[35px] text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold">1. Submit Claim</h3>
              <p className="text-base leading-relaxed text-gray-300">
                Employees easily fill out a simple form with overtime details
                and submit it instantly.
              </p>
            </div>

            <div className="w-full max-w-md p-6 text-center md:max-w-[320px] md:min-w-[250px] md:flex-1">
              <div className="mb-6 inline-flex h-[70px] w-[70px] items-center justify-center rounded-full bg-indigo-600">
                <CheckCircle2 className="h-[35px] w-[35px] text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold">2. Manager Approval</h3>
              <p className="text-base leading-relaxed text-gray-300">
                Managers get notified, review the details, and can approve or
                comment with a single click.
              </p>
            </div>

            <div className="w-full max-w-md p-6 text-center md:max-w-[320px] md:min-w-[250px] md:flex-1">
              <div className="mb-6 inline-flex h-[70px] w-[70px] items-center justify-center rounded-full bg-indigo-600">
                <BellRing className="h-[35px] w-[35px] text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold">3. Track & Get Paid</h3>
              <p className="text-base leading-relaxed text-gray-300">
                Everyone stays informed with real-time status tracking and
                automated notifications. Approved claims proceed smoothly.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#252937] py-12 text-center align-middle text-white md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-5xl font-bold">
            Built With Leading Technologies
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-base text-gray-300 md:text-lg">
            Leveraging modern tools to deliver a reliable and efficient
            experience.
          </p>

          <Marquee />
        </div>
      </section>
      <WorkingProcess />
      <section className="bg-[#2d3142] py-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            See ClaimEasy in Action
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-300">
            A glimpse into our intuitive interface and powerful features.
          </p>
          <InfiniteMovingCards
            items={productImages}
            direction="right"
            speed="slow"
            pauseOnHover={true}
          />
        </div>
      </section>
      <Experts />
    </>
  );
}
const productImages = [
  { src: loginImage, alt: "Login Screen" },
  { src: dashboardImage, alt: "Dashboard View" },
  { src: createImage, alt: "Create Claim Form" },
  { src: myClaimImage, alt: "My Claims List" },
  { src: pendingImage, alt: "Pending Claims View" },
  { src: approveImage, alt: "Approved Claims View" },
  { src: rejectImage, alt: "Rejected Claims View" },
  { src: draftImage, alt: "Draft Claims" },
  { src: financeImage, alt: "Finance Department View" },
  { src: staffImage, alt: "Staff Management" },
  { src: projectImage, alt: "Project Management Integration" },
];
const logos = [
  "https://cdn.worldvectorlogo.com/logos/react-2.svg",
  "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg",
  "https://cdn.worldvectorlogo.com/logos/framer-motion.svg",
  "https://cdn.worldvectorlogo.com/logos/vitejs.svg",
  "https://cdn.worldvectorlogo.com/logos/typescript.svg",
  "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg",
];

const Marquee = () => {
  const realLogos = Array(4).fill(logos).flat(); // 24 logos b vi 6 logos * 4 times

  return (
    <div className="overflow-hidden py-4">
      <motion.div
        className="flex gap-x-16"
        initial={{ x: "0%" }}
        animate={{ x: "-100%" }}
        transition={{
          ease: "linear",
          duration: 25,
          repeat: Infinity,
        }}
      >
        {realLogos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Tech logo ${index + 1}`}
            className="sm:h12 h-16 w-auto"
          />
        ))}
      </motion.div>
    </div>
  );
};
