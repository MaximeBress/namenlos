import { PrismicNextImage } from "@prismicio/next";
import Link from "next/link";
import { Metadata } from "next";

import { createClient } from "@/prismicio";

export default async function Home() {
  const client = createClient();

  const projects = await client.getAllByType("projet");

  return (
    <div className="w-max-[1200px] container mx-auto flex flex-col gap-10 py-10">
      <div className="grid grid-cols-1 gap-10 px-5 lg:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={project.url ?? ""}
            className="flex flex-col bg-white"
          >
            <div className="flex h-150 items-center justify-center overflow-hidden px-5 py-10">
              <PrismicNextImage
                field={project.data.illustrations[0]?.image}
                alt=""
                width={500}
                height={500}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="bg-primary-50 flex flex-1 flex-col justify-between gap-6 p-6">
              <div>
                <h4 className="mb-1 text-xl font-semibold text-slate-800">
                  {project.data.title}
                </h4>
                <p className="text-sm font-semibold text-slate-500 uppercase">
                  {project.data.categories.map((category, index) => (
                    <span key={index}>
                      {index > 0 && "- "}
                      {category.label}{" "}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getByUID("page", "homepage");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
