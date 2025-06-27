"use client";

import { PrismicNextLink } from "@prismicio/next";
import { useState } from "react";
import Link from "next/link";

import { NavigationMenuSlice } from "../../prismicio-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

type MobileMenuProps = {
  items: NavigationMenuSlice[];
};

export const MobileMenu = ({ items }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="ml-auto flex items-center lg:hidden xl:hidden">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:text-blue-600 focus:outline-none"
          aria-expanded={isOpen}
          onClick={toggleMenu}
        >
          <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
          {isOpen ? (
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } fixed inset-0 z-50 transform transition-all duration-300 ease-in-out lg:hidden xl:hidden`}
      >
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "Enter") {
              setIsOpen(false);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Close menu"
        />

        <div
          className={`absolute top-0 right-0 h-full w-4/5 max-w-sm transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
            <h2 className="text-lg font-medium text-gray-900">Menu</h2>
            <button
              type="button"
              className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Menu items */}
          <div className="h-full overflow-y-auto pb-20">
            <div className="space-y-1 px-4 py-3">
              {items.map((item) => (
                <div key={item.id} className="py-2">
                  <PrismicNextLink
                    field={item.primary.link}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.primary.label}
                  </PrismicNextLink>
                </div>
              ))}

              <div className="mt-4 border-t border-gray-200 pt-4">
                <Link
                  href="https://www.instagram.com/namenlos_architecture/"
                  className="font-medium text-[#d53581] uppercase hover:text-[#e74491]"
                >
                  <FontAwesomeIcon icon={faInstagram} width={20} height={20} />
                </Link>
              </div>

              <div className="px-3 pt-4">
                <Link
                  href="/contact"
                  className="block w-full rounded-full bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
