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
import PostCardDropdownMenu from "./PostCardDropdownMenu";
import { buttonVariants } from "./ui/button";
import { BookMarked } from "lucide-react";



type PostWithUserAndTags = (Post & {author: User; tags: Tag[]});

interface PostListProps {
    posts: PostWithUserAndTags[];
    userId: string | undefined;
}

const PostList: FC<PostListProps> = ({ posts, userId }) => {
  return (
    <section className="mb-20 mt-5">
        <h2 className="mb-5 text-5xl font-semibold tracking-tight transition-colors text-center">
            Blogs
        </h2>
        <ul className="max-w-5xl mx-auto post-list gap-4 px-10">
            {posts.map(post => <PostCard key={post.id} post={post} userId={userId} />)}
        </ul>
    </section>
  )
}

const PostCard = ({ post, userId }: { post: PostWithUserAndTags, userId: string | undefined }) => {
    return (
        
            <Card className="h-full relative">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="truncate capitalize">
                            {post.title}
                        </CardTitle>
                        {post.authorId === userId ? <PostCardDropdownMenu postSlug={post.slug} postTitle={post.title} /> : null}
                    </div>
                    <CardDescription>
                        By: <span className="font-bold">{post.author.name}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CardDescription className="line-clamp-3 min-h-[60px]">
                        {post.description}
                    </CardDescription>
                </CardContent>
                {
                    post.tags.length === 0
                    ? null : (
                        <CardFooter className="flex flex-wrap gap-2">
                            {post.tags.map(tag => <Badge key={tag.id}># {tag.name}</Badge>)}
                        </CardFooter>
                    )
                }
                <CardContent>
                    <Link className={buttonVariants({ variant: "secondary", className: "w-full" })} href={`/post/${post.slug}`}>
                        Read <BookMarked className="w-4 h-4" />
                    </Link>
                </CardContent>
            </Card>
        
    )
}

export default PostList