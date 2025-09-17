import { Metadata } from "next";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";
import { Carousel } from "@/components/Carousel";
import { TextProject } from "@/components/TextProject";

type Params = { uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const project = await client.getByUID("projet", uid).catch(() => notFound());

  return (
    <div className="container flex h-[calc(100vh-152px)] max-w-7xl flex-col pt-10 md:flex-row-reverse lg:container lg:mx-auto">
      <div className="flex flex-col gap-5 px-6 md:w-1/2 md:overflow-hidden lg:w-2/5 lg:px-3">
        <TextProject project={project.data} />
      </div>
      <div className="flex flex-1 md:overflow-hidden">
        <Carousel illustrations={project.data.illustrations} />
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
