import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Home() {
  const client = createClient();
  const page = await client.getByUID("page", "homepage");

  return <SliceZone slices={page.data.slices} components={components} />;
}
