import Image from "next/image";
import Navbar from "./components/navbar";
import { client, urlFor } from "./lib/sanity";
import { blogCard } from "./lib/interface";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate = 5;

async function getData() {
  const query = `*[_type == 'blog']| order(releaseDate desc) {
    title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage
  }`;
  const data = await client.fetch(query);

  return data;
}

export default async function Home() {
  const data: blogCard[] = await getData();

  console.log(data);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
        {data.map((post, idx) => (
          <Card key={idx}>
            <Image
              src={urlFor(post.titleImage).url()}
              alt="image"
              width={550}
              height={500}
            />
            <CardContent className="mt-5">
              <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
              <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-400">
                {post.smallDescription}
              </p>
              <Button asChild className="w-full mt-7">
                <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
