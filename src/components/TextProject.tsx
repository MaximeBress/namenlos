"use client";

import { ProjetDocumentData, Simplify } from "../../prismicio-types";
import { PrismicRichText } from "@prismicio/react";
import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

export const TextProject = ({
  project,
}: {
  project: Simplify<ProjetDocumentData>;
}) => {
  const [isVisible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-5 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100">
      <div>
        <h1 className="text-3xl">{project.title}</h1>
        <h2 className="text-xl">
          {project.categories.map((category, index) => (
            <span key={index}>
              {index > 0 && "- "}
              {category.label}{" "}
            </span>
          ))}
        </h2>
      </div>
      {!isVisible && (
        <div className={"flex flex-col items-center gap-3 md:hidden"}>
          <p>{project.short_description}</p>
          <button
            className="group flex w-fit cursor-pointer flex-col items-center"
            onClick={() => setVisible(true)}
          >
            <span className="underline group-hover:no-underline">
              En savoir plus
            </span>
            <BiChevronDown className="group-hover:animate-bounce" />
          </button>
        </div>
      )}
      {isVisible && (
        <>
          <div>
            <PrismicRichText field={project.informations} />
          </div>
          <div>
            <PrismicRichText field={project.description} />
          </div>
          <div className="flex flex-col items-center md:hidden">
            <button
              className="group flex w-fit cursor-pointer flex-col items-center"
              onClick={() => setVisible(false)}
            >
              <BiChevronUp className="group-hover:animate-bounce" />
              <span className="underline group-hover:no-underline">
                Masquer
              </span>
            </button>
          </div>
        </>
      )}
      <div className="hidden md:block">
        <PrismicRichText field={project.informations} />
      </div>
      <div className="hidden md:block">
        <PrismicRichText field={project.description} />
      </div>
    </div>
  );
};
