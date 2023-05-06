"use client";

import { FC, FormEvent, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "./ui/button";
import { Edit } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import TagsCombobox from "./TagsCombobox";
import { Tag } from "@prisma/client";



interface AddPostFormProps {
    tags: Tag[]
}

const AddPostForm: FC<AddPostFormProps> = ({ tags }) => {
  
    const [contentValue, setContentValue] = useState("");
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

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
                    {/* // TODO: Handling Container Background of ReactQuill */}
                    <ReactQuill
                    theme="snow"
                    value={contentValue}
                    onChange={setContentValue}
                    className="h-80 bg-white text-black"
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
                    formats={[
                        "header",
                        "bold", "italic", "underline", "strike",
                        "color", "background",
                        "blockquote", "code-block",
                        "list", "bullet",
                        "align", "indent",
                        "link", "image", 
                        "clean"
                    ]}
                    />
                </div>
                <Button size="lg" className="sm:mt-20 mt-28 text-lg w-fit">
                    Create <Edit />
                </Button>
            </form>
        </div>
    )
}

export default AddPostForm