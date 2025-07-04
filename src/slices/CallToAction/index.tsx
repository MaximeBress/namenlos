import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";

export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

const CallToAction: FC<CallToActionProps> = ({ slice }) => (
  <section
    data-slice-type={slice.slice_type}
    data-slice-variation={slice.variation}
    className="xxl:w-6/12 !mx-auto w-full max-w-full flex-[0_0_auto] !px-[15px] lg:w-8/12 xl:w-7/12"
  >
    {isFilled.richText(slice.primary.title) && (
      <div className="text-center text-6xl font-semibold text-gray-700">
        <PrismicRichText field={slice.primary.title} />
      </div>
    )}
    {isFilled.image(slice.primary.image) && (
      <PrismicNextImage className="" alt="" field={slice.primary.image} />
    )}
    <div className="">
      {isFilled.richText(slice.primary.paragraph) && (
        <div className="">
          <PrismicRichText field={slice.primary.paragraph} />
        </div>
      )}
    </div>
    <PrismicNextLink className="" field={slice.primary.buttonLink} />
  </section>
);

export default CallToAction;
