import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Edit3, MoreVertical } from "lucide-react";
import Link from "next/link";
import PostDeleteDialog from "./PostDeleteDialog";



const PostCardDropdownMenu = ({ postSlug, postTitle }: { postSlug: string; postTitle: string }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="group/dropdown">
                <span className="rounded-full p-2 flex items-center justify-center gap-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background group-hover/dropdown:bg-accent group-hover/dropdown:text-accent-foreground">
                    <MoreVertical />
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Link className="flex items-center gap-2" href={`/update-post/${postSlug}`}>
                        <Edit3 />
                        Update
                    </Link>            
                </DropdownMenuItem>
                <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground">
                    <PostDeleteDialog postSlug={postSlug} postTitle={postTitle} />
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


export default PostCardDropdownMenu;