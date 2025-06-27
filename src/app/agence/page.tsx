import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextImage } from "@prismicio/next";

export default async function Agence() {
  const client = createClient();
  const page = await client.getByUID("page", "agency");

  return (
    <>
      <PrismicNextImage
        field={page.data.cover}
        alt=""
        width={500}
        height={500}
      />
      <h1>{page.data.title}</h1>
      <SliceZone slices={page.data.slices} components={components} />
    </>
  );
}
