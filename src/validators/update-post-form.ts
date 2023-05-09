import { z } from "zod";



const updatePostObject = z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().min(1),
    authorId: z.string().min(1),
    content: z.string().min(1),
    tags: z.object({
        set: z.array(
            z.object({
                id: z.string(),
            })
        )
    }),
});


export default updatePostObject