"use client";
import { useState } from "react";

import Lightbox from "yet-another-react-lightbox";
import NextJsImage from "@/components/NextJsImage";
import { PrismicNextImage } from "@prismicio/next";
import { GroupField } from "@prismicio/client";
import {
  ProjetDocumentDataIllustrationsItem,
  Simplify,
} from "../../prismicio-types";

export const Carousel = ({
  illustrations,
}: {
  illustrations: GroupField<Simplify<ProjetDocumentDataIllustrationsItem>>;
}) => {
  const [openLightboxIndex, setOpenLightboxIndex] = useState(-1);

  const slides = illustrations.map((illustration) => {
    return {
      src: illustration.image.url ?? "",
      width: illustration.image.dimensions?.width,
      height: illustration.image.dimensions?.height,
    };
  });

  return (
    <div className="flex flex-1 flex-col gap-5 md:overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100">
      {illustrations.map((illustration, index) => (
        <div
          key={illustration.image.id}
          className="grid w-full cursor-pointer place-items-center overflow-visible rounded-lg px-6"
        >
          <PrismicNextImage
            field={illustration.image}
            alt=""
            width={500}
            height={500}
            className="shadow-blue-gray-900 w-full rounded-lg object-cover object-center shadow-xl"
            onClick={() => setOpenLightboxIndex(index)}
          />
        </div>
      ))}
      <Lightbox
        index={openLightboxIndex}
        open={openLightboxIndex >= 0}
        close={() => setOpenLightboxIndex(-1)}
        slides={slides}
        render={{ slide: NextJsImage }}
      />
    </div>
  );
};
