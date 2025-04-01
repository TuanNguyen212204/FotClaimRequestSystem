import React from "react";
import { motion } from "framer-motion";

const ProcessStep = ({
  number,
  title,
  description,
  color,
}: {
  number: number;
  title: string;
  description: string;
  color: string;
}) => {
  return (
    <div className="relative flex flex-col items-center">
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-full ${color} z-10 text-xl font-bold text-white`}
      >
        {number}
      </div>

      <h3 className="mt-4 text-sm font-bold text-white sm:text-base">
        {title}
      </h3>

      <p className="mt-2 text-center text-xs text-gray-300 sm:text-sm">
        {description}
      </p>
    </div>
  );
};

export default function WorkingProcess() {
  return (
    <section className="w-full bg-[#2d3142] py-16 text-white">
      <div className="container mx-auto px-4">
        <h1 className="mb-12 text-center text-5xl font-bold">
          Our Working Process
        </h1>

        <div className="relative mx-auto max-w-6xl">
          <div className="absolute top-8 left-0 flex h-1 w-full">
            <div className="flex-1 bg-rose-500"></div>
            <div className="flex-1 bg-amber-500"></div>
            <div className="flex-1 bg-emerald-500"></div>
            <div className="flex-1 bg-sky-500"></div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col items-center">
              <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-rose-500 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="mt-4 text-center text-xs font-bold text-white sm:text-xl">
                Employee Completes Overtime Work
              </h3>
              <p className="mt-2 text-center text-xs text-gray-300">
                Logs extra hours worked.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="mt-4 text-center text-xs font-bold text-white sm:text-xl">
                Submit Overtime Claim Form
              </h3>
              <p className="mt-2 text-center text-xs text-gray-300">
                Fills out a claim form for OT compensation.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="mt-4 text-center text-xs font-bold text-white sm:text-xl">
                Await Approval of Overtime Claim
              </h3>
              <p className="mt-2 text-center text-xs text-gray-300">
                Submits claim form to the manager or HR for approval.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-sky-500 text-2xl font-bold text-white">
                4
              </div>
              <h3 className="mt-4 text-center text-xs font-bold text-white sm:text-xl">
                Receive Overtime Compensation
              </h3>
              <p className="mt-2 text-center text-sm text-gray-300">
                Logs extra hours worked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
