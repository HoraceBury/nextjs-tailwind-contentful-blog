import { createClient } from "contentful";
import { BlogQueryResult } from "./types";
import Link from "next/link";

const client = createClient({
  space: process.env.SPACE_ID!,
  accessToken: process.env.ACCESS_TOKEN!
});

const getBlogEntries = async (): Promise<BlogQueryResult> => {
  const entries = await client.getEntries({
    content_type: "blog",
  });

  return entries as unknown as BlogQueryResult;
};

export default async function Home() {
  const blogEntries = await getBlogEntries();

  return (
    <main className="flex min-h-screen flex-col p-24 gap-y-8 bg-gradient-to-b from-blue-100 to-pink-100">
      {blogEntries.items.map((singlePost) => {
        const { slug, title, date } = singlePost.fields;

        return (
          <div key={slug}>
            <Link className="group" href={`/articles/${slug}`}>
              <h2 className="font-extrabold text-xl group-hover:text-blue-500 transition-colors">{title}</h2>
              <span>
                Posted on{" "}
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </Link>
          </div>
        );
      })}
    </main>
  );
}
