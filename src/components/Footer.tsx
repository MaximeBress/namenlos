"use client";

export const Footer = () => {
  return (
    <div className="bg-primary-950 flex items-center justify-between gap-5 px-10 py-8 text-white">
      <div>@Namenlos {new Date().getFullYear()} - Tous droits réservés</div>
      <div className="cursor-pointer hover:underline">Mentions légales</div>
    </div>
  );
};
