import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { PrismicNextLink } from "@prismicio/next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

import { createClient } from "@/prismicio";
import { MobileMenu } from "@/components/MobileMenu";

export const Navbar = async () => {
  const client = createClient();
  const layout = await client.getSingle("layout");

  return (
    <header className="relative w-full bg-[#edf2fc]">
      <nav className="flex flex-col items-center justify-between p-4 lg:flex-row xl:flex-row">
        <div className="container mx-auto flex flex-nowrap items-center lg:flex-row xl:flex-row">
          <div className="w-full">
            <Link href="/">
              <Image
                src="/assets/logo.jpg"
                alt="Logo Namenlos"
                width={70}
                height={70}
              />
            </Link>
          </div>
          <div className="hidden lg:block xl:block">
            <ul className="ml-auto flex items-center space-x-6">
              {layout.data.slices.map((slice) => (
                <li key={slice.id} className="group relative">
                  <PrismicNextLink
                    field={slice.primary.link}
                    className="font-medium text-gray-700 hover:text-blue-600"
                  >
                    {slice.primary.label}
                  </PrismicNextLink>
                </li>
              ))}
              <li className="group relative">
                <Link
                  href="/contact"
                  className="block w-full rounded-full bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
                >
                  Contact
                </Link>
              </li>
              <Link
                href="https://www.instagram.com/namenlos_architecture/"
                className="font-medium text-[#d53581] uppercase hover:text-[#e74491]"
              >
                <FontAwesomeIcon icon={faInstagram} width={20} height={20} />
              </Link>
            </ul>
          </div>

          <MobileMenu items={layout.data.slices} />
        </div>
      </nav>
    </header>
  );
};
