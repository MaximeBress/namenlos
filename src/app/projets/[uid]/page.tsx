import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrismicRichText, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const project = await client.getByUID("projet", uid).catch(() => notFound());

  return (
    <div className="w-max-[1200px] container mx-auto flex h-screen gap-10 py-10">
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col gap-10 overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100">
          {project.data.illustrations.map((illustration) => (
            <PrismicNextImage
              key={illustration.image.id}
              field={illustration.image}
              alt=""
              width={500}
              height={500}
            />
          ))}
        </div>
      </div>
      <div className="flex max-h-100 w-2/5 flex-col gap-10">
        <div>
          <h1 className="text-3xl">{project.data.title}</h1>
          <h2 className="text-xl">{project.data.category}</h2>
        </div>
        <div>
          <PrismicRichText field={project.data.informations} />
        </div>
        <div>
          <PrismicRichText field={project.data.description} />
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("projet", uid).catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("projet");

  return pages.map((page) => ({ uid: page.uid }));
}
