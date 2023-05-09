import { CustomQuillStyles, UpdatePostForm } from "@/components";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";




export const revalidate = 0;

export async function generateMetadata({ params: { postSlug } }: { params: { postSlug: string } }): Promise<Metadata> {

    const post = await db.post.findUnique({
        where: {
            slug: postSlug
        },
    })

    return {
        title: `Update ${post?.title} | Next Blog`,
        description: `Updating ${post?.title} Page For Next Blog Website`,
    }
}

const page = async ({ params: { postSlug } }: { params: { postSlug: string } }) => {

    const session = await getServerSession(authOptions);

	const tags = await db.tag.findMany();

    const post = await db.post.findUnique({
        where: {
            slug: postSlug
        },
        include: {
            tags: true
        }
    })

    if (!post || session?.user.id !== post.authorId) {
        return notFound();
    }

	return (
		<main className="pt-32">
            <CustomQuillStyles />
			<UpdatePostForm tags={tags} post={post} />
		</main>
	);
};

export default page;
