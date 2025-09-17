import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Texte`.
 */
export type TexteProps = SliceComponentProps<Content.TexteSlice>;

/**
 * Component for "Texte" Slices.
 */
const Texte: FC<TexteProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="font-medium"
    >
      <PrismicRichText field={slice.primary.description} />
    </section>
  );
};

export default Texte;
