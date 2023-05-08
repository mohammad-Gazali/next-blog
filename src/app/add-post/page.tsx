import { AddPostForm } from "@/components";
import { db } from "@/lib/db";
import { Metadata } from "next";



export const metadata: Metadata = {
	title: "Add Post | Next Blog",
	description: "Adding Post Page For Next Blog Website",
};

const page = async () => {
 
	const tags = await db.tag.findMany();

	return (
		<main className="pt-32">
			<AddPostForm tags={tags} />
		</main>
	);
};

export default page;
