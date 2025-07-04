import { PrismicNextImage } from "@prismicio/next";
import Link from "next/link";
import { Metadata } from "next";

import { createClient } from "@/prismicio";

export default async function Home() {
  const client = createClient();

  const projects = await client.getAllByType("projet");

  return (
    <div className="w-max-[1200px] container mx-auto flex flex-col gap-10 py-10">
      <div className="grid grid-cols-1 gap-6 px-5 lg:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-primary-50 flex flex-col rounded-lg shadow-sm"
          >
            <div className="flex h-80 items-center justify-center overflow-hidden rounded-t-md">
              <PrismicNextImage
                field={project.data.illustrations[0]?.image}
                alt=""
                width={500}
                height={500}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-6 p-6">
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
                <p className="mt-4 text-base font-light text-slate-600">
                  {project.data.short_description}
                </p>
              </div>
              <div className="flex justify-center">
                <Link
                  href={project.url ?? ""}
                  className="min-w-32 rounded-md border border-transparent bg-slate-800 px-4 py-2 text-center text-sm text-white shadow-md transition-all hover:bg-slate-700 hover:shadow-lg focus:bg-slate-700 focus:shadow-none"
                >
                  Voir le projet
                </Link>
              </div>
            </div>
          </div>
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
