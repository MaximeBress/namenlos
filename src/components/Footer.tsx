"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname();
  // Hide footer on project detail pages matching /projets/[uid]
  const hideOnProjectDetail = /^\/projets\/[^/]+\/?$/.test(pathname ?? "");
  if (hideOnProjectDetail) return null;

  return (
    <div className="text-primary-950 flex items-center justify-between gap-5 px-10 py-4 text-xs max-md:hidden">
      <div>@Namenlos {new Date().getFullYear()} - Tous droits réservés</div>
      <Link href="/mentions-legales" className="cursor-pointer hover:underline">
        Mentions légales
      </Link>
    </div>
  );
};
