"use client";

import Link from "next/link";

export const Footer = () => {
  return (
    <div className="text-primary-950 flex items-center justify-between gap-5 px-10 py-8 max-md:hidden">
      <div>@Namenlos {new Date().getFullYear()} - Tous droits réservés</div>
      <Link href="/mentions-legales" className="cursor-pointer hover:underline">
        Mentions légales
      </Link>
    </div>
  );
};
