import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Agence() {
  const client = createClient();
  const page = await client.getByUID("page", "agency");

  return (
    <>
      <h1>{page.data.title}</h1>
      <SliceZone slices={page.data.slices} components={components} />
    </>
  );
}
