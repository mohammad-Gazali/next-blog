import { Hero } from "@/components/layout";
import { Metadata } from "next";



export const metadata: Metadata = {
  title: "Home Page | Next Blog",
  description: "Home Page For Next Blog Website"
}

export default function Home() {
  return (
    <main className="">
      <Hero />
    </main>
  )
}
