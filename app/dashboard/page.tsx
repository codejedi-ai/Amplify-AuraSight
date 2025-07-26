"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "aws-amplify/auth"
import { generateClient } from "aws-amplify/data"
import type { Schema } from "@/amplify/data/resource"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"

const client = generateClient<Schema>()

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const [profileType, setProfileType] = useState("brand")
  const [name, setName] = useState("")
  const [details, setDetails] = useState("") // For industry or niche
  const [aura, setAura] = useState("")

  const [brands, setBrands] = useState<Array<Schema["Brand"]["type"]>>([])
  const [influencers, setInfluencers] = useState<Array<Schema["Influencer"]["type"]>>([])

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }
    checkUser()
  }, [router])

  useEffect(() => {
    if (!user) return

    const brandSub = client.models.Brand.observeQuery({
      filter: { owner: { eq: user.userId } },
    }).subscribe({
      next: (data) => setBrands([...data.items]),
    })

    const influencerSub = client.models.Influencer.observeQuery({
      filter: { owner: { eq: user.userId } },
    }).subscribe({
      next: (data) => setInfluencers([...data.items]),
    })

    return () => {
      brandSub.unsubscribe()
      influencerSub.unsubscribe()
    }
  }, [user])

  const createProfile = async () => {
    if (!name || !details || !aura) return

    if (profileType === "brand") {
      await client.models.Brand.create({
        name,
        industry: details,
        brandAura: aura,
      })
    } else {
      await client.models.Influencer.create({
        name,
        niche: details,
        auraVibe: aura,
      })
    }
    setName("")
    setDetails("")
    setAura("")
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-purple-500" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-24 md:px-6">
      <h1 className="text-4xl font-bold mb-4">Welcome, {user?.signInDetails?.loginId.split("@")[0]}!</h1>
      <p className="text-gray-400 mb-8">Manage your profiles and find your perfect match.</p>

      <Tabs defaultValue="brand" className="w-full" onValueChange={setProfileType}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="brand">I am a Brand</TabsTrigger>
          <TabsTrigger value="influencer">I am an Influencer</TabsTrigger>
        </TabsList>
        <TabsContent value="brand">
          <Card>
            <CardHeader>
              <CardTitle>Create Your Brand Profile</CardTitle>
              <CardDescription>Let influencers know what your brand is all about.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="brand-name">Brand Name</Label>
                <Input id="brand-name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Input id="industry" value={details} onChange={(e) => setDetails(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="brand-aura">Brand Aura</Label>
                <Input
                  id="brand-aura"
                  placeholder="e.g., Energetic, Minimalist, Luxurious"
                  value={aura}
                  onChange={(e) => setAura(e.target.value)}
                />
              </div>
              <Button onClick={createProfile} className="bg-purple-600 hover:bg-purple-700">
                Create Brand Profile
              </Button>
            </CardContent>
          </Card>
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Your Brands</h3>
            {brands.length > 0 ? (
              brands.map((brand) => (
                <div key={brand.id} className="p-4 border rounded-md mb-2 bg-gray-800">
                  <p className="font-bold text-lg">{brand.name}</p>
                  <p className="text-sm text-gray-400">Industry: {brand.industry}</p>
                  <p className="text-sm text-gray-400">Aura: {brand.brandAura}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No brand profiles yet.</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="influencer">
          <Card>
            <CardHeader>
              <CardTitle>Create Your Influencer Profile</CardTitle>
              <CardDescription>Showcase your unique vibe to brands.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="influencer-name">Your Name</Label>
                <Input id="influencer-name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="niche">Niche</Label>
                <Input id="niche" value={details} onChange={(e) => setDetails(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="influencer-aura">Your Vibe</Label>
                <Input
                  id="influencer-aura"
                  placeholder="e.g., Quirky, Adventurous, Calming"
                  value={aura}
                  onChange={(e) => setAura(e.target.value)}
                />
              </div>
              <Button onClick={createProfile} className="bg-purple-600 hover:bg-purple-700">
                Create Influencer Profile
              </Button>
            </CardContent>
          </Card>
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Your Influencer Profiles</h3>
            {influencers.length > 0 ? (
              influencers.map((influencer) => (
                <div key={influencer.id} className="p-4 border rounded-md mb-2 bg-gray-800">
                  <p className="font-bold text-lg">{influencer.name}</p>
                  <p className="text-sm text-gray-400">Niche: {influencer.niche}</p>
                  <p className="text-sm text-gray-400">Vibe: {influencer.auraVibe}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No influencer profiles yet.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
