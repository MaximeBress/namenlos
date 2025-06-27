import { PrismicNextImage } from "@prismicio/next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Agence() {
  const client = createClient();
  const page = await client.getByUID("page", "projects");

  const projects = await client.getAllByType("projet");

  console.log(projects);

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
