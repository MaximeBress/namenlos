import { PrismicNextImage } from "@prismicio/next";

import { createClient } from "@/prismicio";
import Link from "next/link";

export default async function Agence() {
  const client = createClient();
  const page = await client.getByUID("page", "projects");

  const projects = await client.getAllByType("projet");

  return (
    <div className="w-max-[1200px] container mx-auto flex flex-col gap-10 py-10">
      <h1 className="text-6xl text-gray-800">{page.data.title}</h1>
      <div className="grid grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col justify-between gap-0 overflow-hidden rounded-md bg-white"
          >
            <PrismicNextImage
              field={project.data.illustrations[0]?.image}
              alt=""
              width={500}
              height={500}
              className="p-4"
            />
            <div className="bg-primary-50 flex flex-col gap-2 px-6 py-4">
              <h2>{project.data.title}</h2>
              <p>{project.data.meta_description}</p>
              <Link
                href={project.url ?? ""}
                className="bg-secondary-600 hover:bg-secondary-700 w-fit rounded-md px-4 py-2 text-white"
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
