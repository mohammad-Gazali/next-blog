import { Post, Tag, User } from "@prisma/client";
import { FC } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";
  



type PostWithUserAndTags = (Post & {author: User; tags: Tag[]});

interface PostListProps {
    posts: PostWithUserAndTags[];
}

const PostList: FC<PostListProps> = ({ posts }) => {
  return (
    <section className="mb-20 mt-5">
        <h2 className="mb-5 text-5xl font-semibold tracking-tight transition-colors text-center">
            Blogs
        </h2>
        <ul className="max-w-5xl mx-auto post-list gap-4 px-10">
            {posts.map(post => <PostCard key={post.id} post={post} />)}
        </ul>
    </section>
  )
}

const PostCard = ({ post }: { post: PostWithUserAndTags }) => {
    return (
        <Link className="group" href={`/post/${post.slug}`}>
            <Card className="h-full group-hover:bg-secondary transition-colors">
                <CardHeader>
                    <CardTitle className="capitalize">
                        {post.title}
                    </CardTitle>
                    <CardDescription>
                        By: <span className="font-bold">{post.author.name}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CardDescription className="line-clamp-3">
                        {post.description}
                    </CardDescription>
                </CardContent>
                {
                    post.tags.length === 0
                    ? null : (
                        <CardFooter className="flex flex-wrap gap-2">
                            {post.tags.map(tag => <Badge># {tag.name}</Badge>)}
                        </CardFooter>
                    )
                }
            </Card>
        </Link>
    )
}

export default PostList