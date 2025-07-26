import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import ConfigureAmplifyClientSide from "@/components/configure-amplify"
import { Authenticator } from "@aws-amplify/ui-react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AuraSight - Match Your Vibe",
  description:
    "AuraSight is an influencer management platform that seeks to match the auras and vibes of influencers with the brands they sponsor.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white antialiased`}>
        <ConfigureAmplifyClientSide />
        <Authenticator.Provider>
          <Navbar />
          <main>{children}</main>
          <footer className="py-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} AuraSight. All rights reserved.</p>
          </footer>
        </Authenticator.Provider>
      </body>
    </html>
  )
}
