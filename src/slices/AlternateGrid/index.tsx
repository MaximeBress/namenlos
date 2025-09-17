import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export type AlternateGridProps =
  SliceComponentProps<Content.AlternateGridSlice>;

const AlternateGrid: FC<AlternateGridProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div
        className={`flex gap-10 ${
          slice.variation === "imageRight" ? "flex-row-reverse" : ""
        } `}
      >
        {isFilled.image(slice.primary.image) && (
          <PrismicNextImage alt="" height={500} field={slice.primary.image} />
        )}
        {isFilled.richText(slice.primary.description) && (
          <div className="font-medium">
            <PrismicRichText field={slice.primary.description} />
          </div>
        )}
      </div>
    </section>
  );
};

export default AlternateGrid;
