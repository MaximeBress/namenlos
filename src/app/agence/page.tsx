import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextImage } from "@prismicio/next";

export default async function Agence() {
  const client = createClient();
  const page = await client.getByUID("page", "agency");

  return (
    <div className="container mx-auto flex max-w-7xl flex-col gap-10 py-10">
      <PrismicNextImage
        field={page.data.cover_image}
        alt=""
        width={500}
        height={500}
        className="h-full w-full object-cover"
      />
      <h1 className="text-3xl">{page.data.title}</h1>
      <SliceZone slices={page.data.slices} components={components} />
    </div>
  );
}
