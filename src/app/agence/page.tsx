import {SliceZone} from "@prismicio/react";

import {createClient} from "@/prismicio";
import {components} from "@/slices";

export default async function Agence() {
    const client = createClient();
    const page = await client.getSingle("agency");

    return <SliceZone slices={page.data.slices} components={components} />;
}
