import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import updatePostObject from "@/validators/update-post-form";
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";



export async function POST(req: Request) {

    const session = await getServerSession(authOptions);

    if (!session?.user.id) { 
        return NextResponse.json({
            message : "Not Authorized"
        }, { status: 401 })
    }

    const body = await req.json();

    try {

        const data = {
            id: body?.id,
            title: body?.formData?.title as string,
            slug: body?.formData?.slug as string,
            description: body?.formData?.description as string,
            authorId: session.user.id,
            content: body?.contentValue,
            tags: {
                set: body?.tags,
            }
        };

        const parsed_data = updatePostObject.parse(data);

        const post = await db.post.findUnique({
            where: {
                id: parsed_data.id
            }
        })

        if (!post) {
            return NextResponse.json({
                message: "Not Found",
            }, { status: 404 })
        }

        if (post.authorId !== session.user.id) {
            return NextResponse.json({
                message: "Forbidden"
            }, { status: 403 })
        }

        await db.post.update({
            where: {
                id: parsed_data.id
            },
            data: parsed_data
        })

        return NextResponse.json({
            message: "Post Has Been Updated Successfully"
        })

    } catch (error) {

        if (error instanceof z.ZodError) {
            return NextResponse.json({
                message: "Invalid Payload",
            }, { status: 400 })
        }

        if (error instanceof PrismaClientKnownRequestError || error instanceof PrismaClientUnknownRequestError) {
            return NextResponse.json({
                message: error.message,
            }, { status: 400 })
        }

        console.log(error)

        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })
    }

}