import { PortableTextBlock } from "@portabletext/types";
export interface blogCard {
  title: string;
  smallDescription: string;
  slug: string;
  titleImage: string;
  currentSlug?: string;
}

export interface fullBlogCard {
  slug: string;
  title: string;
  titleImage: string;
  content: PortableTextBlock[];
}
