import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import fot from "@assets/fotLandingPageFooter.png";

export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-[#2d3142] py-12 text-white">
      <div className="container mx-auto px-4">
        <hr className="my-12 border-t border-gray-600" />
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center">
              <img
                src={fot}
                alt="FPT Overtime Logo"
                className="transition-transform hover:scale-105 md:h-20"
              />
              <div className="poppins-font mr-2 text-3xl font-bold">
                FPT OVERTIME
              </div>
            </div>

            <p className="mb-6 text-xl leading-relaxed text-gray-300">
              We are committed to providing a fast, reliable, and hassle-free
              claims process, ensuring you receive the support and resolution
              you need with complete transparency and security.
            </p>
            <p className="text-xl text-gray-500">© 2025 Copyright</p>
          </div>

          <div>
            <h1 className="mb-4 text-3xl font-bold">Contact</h1>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-xl">
                <Mail size={16} className="text-gray-400" />
                <a
                  href="mailto:lalalala@fpt.edu.vn"
                  className="transition-colors duration-300 ease-in-out hover:text-blue-600"
                >
                  fot@fpt.edu.vn
                </a>
              </li>
              <li className="flex items-center gap-2 text-xl">
                <Phone size={16} className="text-gray-400" />
                <span>09xxxxxxxx</span>
              </li>
              <li className="flex items-start gap-2 text-xl">
                <MapPin size={16} className="mt-1 text-gray-400" />
                <span>
                  5 Floor, F Building, High-teach Park, Tan Phu Ward, District
                  9, Ho Chi Minh, Vietnam
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
