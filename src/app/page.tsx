import { PostList } from "@/components";
import { Hero } from "@/components/layout";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";



export const metadata: Metadata = {
  title: "Home Page | Next Blog",
  description: "Home Page For Next Blog Website"
}

export const revalidate = 60;

export default async function Home() {

  const session = await getServerSession(authOptions);

  const posts = await db.post.findMany({
    include: {
      author: true,
      tags: true,
    }
  });

  return (
    <main>
      <Hero />
      <PostList posts={posts} userId={session?.user.id} />
    </main>
  )
}
