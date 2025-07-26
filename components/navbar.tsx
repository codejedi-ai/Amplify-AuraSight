"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getCurrentUser, signOut } from "aws-amplify/auth"
import { Hub } from "aws-amplify/utils"

export default function Navbar() {
  const [authStatus, setAuthStatus] = useState("unauthenticated")
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      try {
        await getCurrentUser()
        setAuthStatus("authenticated")
      } catch {
        setAuthStatus("unauthenticated")
      }
    }

    checkUser()

    const hubListener = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signedIn":
          setAuthStatus("authenticated")
          break
        case "signedOut":
          setAuthStatus("unauthenticated")
          break
      }
    })

    return () => {
      hubListener()
    }
  }, [])

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-3">
          <Image src="/logo.png" alt="AuraSight Logo" width={40} height={40} className="h-10 w-10" />
          <span className="text-2xl font-bold">AuraSight</span>
        </Link>
        <nav className="hidden items-center space-x-6 md:flex">
          <Link href="/#how-it-works" className="hover:text-purple-400">
            How It Works
          </Link>
          <Link href="/#features" className="hover:text-purple-400">
            Features
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          {authStatus === "authenticated" ? (
            <>
              <Button variant="outline" onClick={() => router.push("/dashboard")}>
                Dashboard
              </Button>
              <Button onClick={handleSignOut} className="bg-red-600 hover:bg-red-700">
                Logout
              </Button>
            </>
          ) : (
            <Button onClick={() => router.push("/login")} className="bg-purple-600 hover:bg-purple-700">
              Login / Sign Up
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
