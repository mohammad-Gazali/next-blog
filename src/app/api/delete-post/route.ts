import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
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
        
        const parsedSlug = z.object({ slug: z.string().min(1) }).parse(body).slug;

        const post = await db.post.findUnique({
            where: {
                slug: parsedSlug
            }
        })

        if (post?.authorId !== session.user.id) {
            return NextResponse.json({
                message : "Forbidden"
            }, { status: 403 })
        }

        await db.post.delete({
            where: {
                slug: parsedSlug
            }
        })

        return NextResponse.json({
            message: "Post Has Been Deleted Successfully"
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