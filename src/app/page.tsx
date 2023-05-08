import { PostList } from "@/components";
import { Hero } from "@/components/layout";
import { db } from "@/lib/db";
import { Metadata } from "next";



export const metadata: Metadata = {
  title: "Home Page | Next Blog",
  description: "Home Page For Next Blog Website"
}

export default async function Home() {

  const posts = await db.post.findMany({
    include: {
      author: true,
      tags: true,
    }
  });

  return (
    <main>
      <Hero />
      <PostList posts={posts} />
    </main>
  )
}
