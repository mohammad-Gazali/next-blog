import { UserAuthForm } from "@/components";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";



export const metadata: Metadata = {
    title: "Login Page | Next Blog",
    description: "Login Page For Next Blog Website"
}


const page = async () => {

  return (
    <main className="absolute inset-0 mx-auto container flex h-screen flex-col justify-center items-center">
        <div className="mx-auto w-full flex flex-col justify-center gap-6 max-w-lg">
            <div className="flex flex-col items-center gap-6 text-center">
                <Link href="/" className={buttonVariants({ variant: "ghost", className: "w-fit" })}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back to home
                </Link>
                <h2 className="pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                    Welcome back!
                </h2>
                <p>Please sign in using your Github account.</p>
            </div>
            <UserAuthForm />
        </div>
    </main>
  )
}

export default page