"use client";

import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BiLogoInstagram, BiMenu, BiX } from "react-icons/bi";

import { LayoutDocumentData } from "../../prismicio-types";
import { Simplify } from "type-fest";

export const Navbar = ({
  navItems,
}: {
  navItems: Simplify<LayoutDocumentData>;
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpenVisible] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  return (
    <nav
      className={`bg-primary-50 fixed z-50 w-full shadow-md transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <Link href="/" className="cursor-pointer">
              <h1 className="text-3xl font-semibold">Namenlos</h1>
            </Link>
          </div>

          <div className="hidden items-center space-x-8 md:flex">
            <Link
              href="/"
              className={`text-md hover:text-primary-600 cursor-pointer rounded-md px-3 py-2 font-medium transition-colors duration-200 ${pathname === "/" ? "text-primary-500" : "text-gray-600"}`}
            >
              Projets
            </Link>
            {navItems.slices.map((item) => (
              <PrismicNextLink
                key={item.id}
                field={item.primary.link}
                className={`text-md hover:text-primary-600 cursor-pointer rounded-md px-3 py-2 font-medium transition-colors duration-200 ${
                  pathname ===
                  (
                    item.primary.link as {
                      url: string;
                    }
                  ).url
                    ? "text-primary-500"
                    : "text-gray-600"
                }`}
              >
                {item.primary.label}
              </PrismicNextLink>
            ))}
            <Link
              href="/contact"
              className={`text-md hover:text-primary-600 cursor-pointer rounded-md px-3 py-2 font-medium transition-colors duration-200 ${pathname === "/contact" ? "text-primary-500" : "text-gray-600"}`}
            >
              Contact
            </Link>
            <Link
              href="https://www.instagram.com/namenlos_architecture/"
              className="font-medium text-[#d53581] uppercase hover:text-[#e74491]"
              target="_blank"
            >
              <BiLogoInstagram className="text-3xl" />
            </Link>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <Link
              href="https://www.instagram.com/namenlos_architecture/"
              className="font-medium text-[#d53581] uppercase hover:text-[#e74491]"
              target="_blank"
            >
              <BiLogoInstagram className="text-3xl" />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpenVisible(!isMobileMenuOpen)}
              className="focus:ring-primary-300 hover:text-primary-600 inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-inset"
            >
              {!isMobileMenuOpen ? (
                <BiMenu className="text-3xl" />
              ) : (
                <BiX className="text-3xl" />
              )}
            </button>
          </div>
        </div>

        <div
          className={`transition-all duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen
              ? "max-h-64 opacity-100"
              : "max-h-0 overflow-hidden opacity-0"
          }`}
        >
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            <Link
              href="/"
              className={`block rounded-md px-3 py-2 text-base font-medium ${pathname === "/" ? "text-primary-600 bg-primary-50" : "hover:text-primary-500 text-gray-600"}`}
              onClick={() => setIsMobileMenuOpenVisible(false)}
            >
              Projets
            </Link>
            {navItems.slices.map((item) => (
              <PrismicNextLink
                key={item.id}
                field={item.primary.link}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  pathname ===
                  (
                    item.primary.link as {
                      url: string;
                    }
                  ).url
                    ? "text-primary-600 bg-primary-50"
                    : "hover:text-primary-500 text-gray-600"
                }`}
                onClick={() => setIsMobileMenuOpenVisible(false)}
              >
                {item.primary.label}
              </PrismicNextLink>
            ))}
            <Link
              href="/contact"
              className={`block rounded-md px-3 py-2 text-base font-medium ${pathname === "/contact" ? "text-primary-600 bg-primary-50" : "hover:text-primary-500 text-gray-600"}`}
              onClick={() => setIsMobileMenuOpenVisible(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
