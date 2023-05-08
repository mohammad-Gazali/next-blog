import { Providers } from "@/components";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { Navbar } from "@/components/layout";
import "./globals.css";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Blog",
  description: "Next Blog built with Next.js framework by mohammed Gazali"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen ${inter.className}`}>
        <Providers>
          {/* @ts-ignore */}
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
