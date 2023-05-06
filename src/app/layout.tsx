import { Providers } from "@/components";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout";



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
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
