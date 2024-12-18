import { CustomQuillStyles } from "@/components";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { format } from "date-fns";
import "react-quill/dist/quill.snow.css";



export const revalidate = 60;


export async function generateStaticParams() {
  const posts = await db.post.findMany({})
 
  return posts.map((post) => ({
    postSlug: post.slug,
  }));
}

const PostPage = async ({ params: { postSlug } }: { params: { postSlug: string } }) => {

  const post = await db.post.findUnique({
    where: {
      slug: postSlug
    },
    include: {
      author: true,
      tags: true,
    }
  })

  if (!post) {
    return {
      notFound: true
    }
  }

  return (
    <main className="pt-32 max-w-5xl mx-auto sm:px-10 md:px-6 px-4 mb-20">
        <CustomQuillStyles />
        <h1 className="lg:text-6xl md:text-5xl text-4xl font-bold">
            {post?.title}
        </h1>
        <p className="text-muted-foreground mt-2 flex items-center gap-x-10 flex-wrap">
          <span className="font-bold">{post?.author.name}</span><span>({format(post?.createdAt!, "PPPP")})</span>
        </p>
        <Separator className="my-10" orientation="horizontal" />
        <div className="ql-snow">
          <section className="ql-editor p-0 post-section" dangerouslySetInnerHTML={{ __html: post?.content! }}/>
        </div>
        <Separator className="my-10" orientation="horizontal" />
    </main>
  )
}

export default PostPage