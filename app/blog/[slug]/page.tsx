import { fullBlogCard } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";

async function getData(slug: string) {
  const query = `*[_type == 'blog' && slug.current == '${slug}']{
        "currentSlug":slug.current,
        title,
        content,
        titleImage
    }[0]`;
  const data = await client.fetch(query);
  return data;
}

export default async function Article({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlogCard = await getData(params.slug);

  return (
    <div className="mt-8">
      <h1>
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
          Raj - Blog
        </span>
        <span className="mt-4 block text-4xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>
      <Image
        src={urlFor(data.titleImage).url()}
        alt={data.title}
        width={800}
        height={800}
        className="rounded mt-9 border"
        priority
      />
      <div className="mt-16 prose prose-blue prose-xl dark:prose-invert">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
