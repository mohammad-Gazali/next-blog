"use client";

import { FC, FormEvent, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "./ui/button";
import { Edit, Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import TagsCombobox from "./TagsCombobox";
import { Tag } from "@prisma/client";
import { useTheme } from "next-themes";
import { db } from "@/lib/db";
import { toast } from "./ui/use-toast";



interface AddPostFormProps {
    tags: Tag[];
}

const AddPostForm: FC<AddPostFormProps> = ({ tags }) => {
  
    const { theme } = useTheme();
    const [contentValue, setContentValue] = useState("");
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        setIsLoading(true);

        try {

            const formData = Object.fromEntries(new FormData(e.currentTarget)); 
            
            const response = await fetch("/api/add-post", {
                method: "POST",
                body: JSON.stringify({
                    formData,
                    tags: tags.map(tag => ({id: tag.id})),
                    contentValue
                })
            })

            if (response.status == 200) {
                toast({
                    title: "Success",
                    description: "Post Has Been Created Successfully"
                })
            } else {

                const data = await response.json();

                toast({
                    variant: "destructive",
                    title: "Error",
                    description: data.message
                })

            }

        } catch (error) {
          
            console.log(error)

            toast({
                variant: "destructive",
                title: "Error",
                description: "Something wrong happend while creating the post."
            })

        } finally {

            setIsLoading(false);
            
        }

    }

    return (
        <div className="lg:px-10 md:px-8 sm:px-6 px-4">
            <h2 className="pb-8 sm:text-4xl text-2xl font-semibold tracking-tight transition-colors first:mt-0">
                Adding Post
            </h2>
            <form className="flex flex-col gap-6 mb-10" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input id="slug" name="slug" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" />
                </div>
                <div className="space-y-2 z-30">
                    <Label htmlFor="tags">
                        Tags
                    </Label>
                    <TagsCombobox selectedTags={selectedTags} setSelectedTags={setSelectedTags} tags={tags} />
                </div>
                <div className="space-y-2">
                    <Label>Content</Label>
                    <DarkThemeStyles theme={theme} />
                    <ReactQuill
                    theme="snow"
                    value={contentValue}
                    onChange={setContentValue}
                    className=""
                    modules={{
                        toolbar: [
                            [{ "header": [1, 2, 3, 4, 5, 6, false] }],
                            ["bold", "italic", "underline","strike"],
                            [{"color": []}, {"background": []}],
                            ["blockquote", "code-block"],
                            [{"list": "ordered"}, {"list": "bullet"}],
                            [{"align": [] }, {"indent": "-1"}, {"indent": "+1"}],
                            ["link", "image"],
                            ["clean"]
                        ],
                    }}
                    />
                </div>
                <Button disabled={isLoading} className="mt-8 w-fit">
                    Create {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Edit className="w-4 h-4" />}
                </Button>
            </form>
        </div>
    )
}

const DarkThemeStyles = ({ theme }: { theme?: string }) => {

    if (theme !== "dark") return <></>

    return <style>{`
    .ql-stroke {
        stroke: hsl(var(--muted-foreground)) !important;
    }

    .ql-fill {
        fill: hsl(var(--muted-foreground)) !important;
    }

    .ql-picker-label {
        color: hsl(var(--foreground)) !important;
    }

    .ql-picker-options {
        background-color: hsl(var(--background)) !important;
        border-color: hsl(var(--input)) !important;
        color: hsl(var(--foreground)) !important;
    }

    .ql-snow.ql-toolbar button:hover,
    .ql-snow .ql-toolbar button:hover,
    .ql-snow.ql-toolbar button:focus,
    .ql-snow .ql-toolbar button:focus,
    .ql-snow.ql-toolbar button.ql-active,
    .ql-snow .ql-toolbar button.ql-active,
    .ql-snow.ql-toolbar .ql-picker-label:hover,
    .ql-snow .ql-toolbar .ql-picker-label:hover,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active,
    .ql-snow.ql-toolbar .ql-picker-item:hover,
    .ql-snow .ql-toolbar .ql-picker-item:hover,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected {
        color: #7e22ce !important;
    }

    .ql-snow.ql-toolbar button:hover .ql-fill,
    .ql-snow .ql-toolbar button:hover .ql-fill,
    .ql-snow.ql-toolbar button:focus .ql-fill,
    .ql-snow .ql-toolbar button:focus .ql-fill,
    .ql-snow.ql-toolbar button.ql-active .ql-fill,
    .ql-snow .ql-toolbar button.ql-active .ql-fill,
    .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
    .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill,
    .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,
    .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill,
    .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {
        fill: #7e22ce !important;
    }
    .ql-snow.ql-toolbar button:hover .ql-stroke,
    .ql-snow .ql-toolbar button:hover .ql-stroke,
    .ql-snow.ql-toolbar button:focus .ql-stroke,
    .ql-snow .ql-toolbar button:focus .ql-stroke,
    .ql-snow.ql-toolbar button.ql-active .ql-stroke,
    .ql-snow .ql-toolbar button.ql-active .ql-stroke,
    .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
    .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
    .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
    .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
    .ql-snow.ql-toolbar button:hover .ql-stroke-miter,
    .ql-snow .ql-toolbar button:hover .ql-stroke-miter,
    .ql-snow.ql-toolbar button:focus .ql-stroke-miter,
    .ql-snow .ql-toolbar button:focus .ql-stroke-miter,
    .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
    .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter,
    .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
    .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
    .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
    .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
        stroke: #7e22ce !important;
    }

    .ql-snow {
        border-color: hsl(var(--input)) !important;
    }`}</style>
}

export default AddPostForm