"use client";

import { FC, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { AlertTriangle, Loader2, Trash2, X } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";




interface PostDeleteDialogProps {
	postTitle: string;
	postSlug: string;
}

const PostDeleteDialog: FC<PostDeleteDialogProps> = ({ postTitle, postSlug }) => {

    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { toast } = useToast();


    const handleDelete = async () => {
        setIsLoading(true);

        try {
            
            const response = await fetch("/api/delete-post", {
                method: "POST",
                body: JSON.stringify({
                    slug: postSlug
                })
            });

            const data = await response.json();

            if (response.status === 200) {

                toast({
                    title: "Success",
                    description: data.message,
                });

                setOpen(false);

                window.location.replace("/");

            } else {

                toast({
                    variant: "destructive",
                    title: "Error",
                    description: data.message
                });

            }

        } catch (error) {
            
            console.log(error);

            toast({
                variant: "destructive",
                title: "Error",
                description: String(error)
            });

        } finally {
            setIsLoading(false);
        }
    }

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger className="flex items-center gap-2">
				<Trash2 />
				Delete
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						Warning <AlertTriangle />
					</DialogTitle>
					<DialogDescription>
						Are you sure you want to remove{" "}
						<span className="font-bold">{postTitle}</span> ?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button disabled={isLoading} onClick={() => setOpen(false)} variant="secondary">
						Cancel <X />
					</Button>
					<Button disabled={isLoading} onClick={handleDelete} variant="destructive">
						Delete {isLoading ? <Loader2 className="animate-spin" /> : <Trash2 />}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default PostDeleteDialog;
