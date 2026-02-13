import Link from "next/link";
import { Metadata } from "next";

import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";

export default async function Home() {
  const client = createClient();

  const projects = await client.getAllByType("projet");

  return (
    <div className="container mx-auto flex max-w-7xl flex-col gap-10 py-10">
      <div className="grid grid-cols-1 gap-x-[80px] gap-y-[50px] lg:grid-cols-2 xl:grid-cols-3">
        {projects
          .sort((a, b) => {
            const posA = a.data.position ?? Number.MAX_VALUE;
            const posB = b.data.position ?? Number.MAX_VALUE;
            return posA - posB;
          })
          .map((project) => (
            <Link
              key={project.id}
              href={project.url ?? ""}
              className="flex flex-col bg-white"
            >
              <div className="flex h-[450px] items-center justify-center overflow-hidden px-5 pt-5 pb-10">
                <PrismicNextImage
                  field={project.data.illustrations[0]?.image}
                  alt=""
                  width={500}
                  height={500}
                  className="h-full w-full object-cover"
                  imgixParams={{ fit: "max", w: 1080 }}
                />
              </div>
              <div className="bg-primary-50 flex flex-1 flex-col justify-between gap-6 px-6 py-1">
                <div>
                  <h4 className="mb-1 text-[17px] font-medium text-slate-800">
                    {project.data.title}
                  </h4>
                  <p className="text-[11px] font-medium text-[#9e9e9e] italic">
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
