import { PrismicNextImage } from "@prismicio/next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Link from "next/link";

export default async function Agence() {
  const client = createClient();
  const page = await client.getByUID("page", "projects");

  const projects = await client.getAllByType("projet");

  console.log(projects);

  return (
    <div className="w-max-[1200px] container mx-auto py-10">
      <PrismicNextImage
        field={page.data.cover}
        alt=""
        width={500}
        height={500}
      />
      <h1>{page.data.title}</h1>
      <SliceZone slices={page.data.slices} components={components} />
      <div className="grid grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col justify-between gap-6 rounded-md border border-gray-200"
          >
            <PrismicNextImage
              field={project.data.cover}
              alt=""
              width={500}
              height={500}
            />
            <div className="flex flex-col gap-2 p-4">
              <h2>{project.data.title}</h2>
              <p>{project.data.meta_description}</p>
              <Link
                href={project.url ?? ""}
                className="w-fit rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
              >
                Voir le projet
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
