import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const session = await getServerSession(authOptions);

    if (!session?.user.id) { 
        return NextResponse.json({
            message : "Not Authorized"
        }, { status: 401 })
    }

    const body = await req.json();

    try {

        await db.post.create({
            data: {
                id: nanoid(),
                title: body.formData.title as string,
                slug: body.formData.slug as string,
                description: body.formData.description as string,
                authorId: session.user.id,
                content: body.contentValue,
                tags: {
                    connect: body.tags
                }
            }
        })

        return NextResponse.json({
            message: "Post Has Been Created Successfully"
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })
    }

}