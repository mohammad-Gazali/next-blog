import { UserAuthForm } from "@/components";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";



const page = async () => {

  return (
    <section className="absolute inset-0 mx-auto container flex h-screen flex-col justify-center items-center">
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
    </section>
  )
}

export default page