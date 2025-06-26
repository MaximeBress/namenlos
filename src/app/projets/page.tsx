import {SliceZone} from "@prismicio/react";

import {createClient} from "@/prismicio";
import {components} from "@/slices";

export default async function Agence() {
    const client = createClient();
    const page = await client.getSingle("projects");
    const projects = await client.getAllByType("projet");

    console.log(projects);

    return <SliceZone slices={page.data.slices} components={components} />;
}
