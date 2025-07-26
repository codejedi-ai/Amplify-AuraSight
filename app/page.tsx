import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Bot, BarChart } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex h-screen items-center justify-center text-center">
        <div className="absolute inset-0 bg-grid-purple-500/[0.2] [mask-image:linear-gradient(to_bottom,white_5%,transparent_100%)]"></div>
        <div className="z-10 flex flex-col items-center space-y-6 px-4">
          <h1 className="text-5xl font-bold tracking-tighter md:text-7xl">
            Find Your Brand&apos;s Perfect{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Aura</span>
          </h1>
          <p className="max-w-2xl text-lg text-gray-300">
            AuraSight connects brands with influencers whose vibes perfectly align, creating authentic partnerships that
            resonate.
          </p>
          <div className="flex space-x-4">
            <Button size="lg" className="bg-purple-600 text-white hover:bg-purple-700">
              For Brands
            </Button>
            <Button size="lg" variant="outline">
              For Influencers
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-12 text-center text-4xl font-bold">Sync Your Vibe in 3 Simple Steps</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white">
                    1
                  </span>
                  Define Your Aura
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Tell us about your brand&apos;s identity, values, and the energy you want to project. Our AI analyzes
                  your unique aura.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white">
                    2
                  </span>
                  Discover Aligned Vibes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Browse a curated list of influencers whose content, style, and audience perfectly match your
                  brand&apos;s frequency.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white">
                    3
                  </span>
                  Create Authentic Synergy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Launch powerful, authentic campaigns that feel less like ads and more like genuine recommendations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-950 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-12 text-center text-4xl font-bold">Platform Features</h2>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <Bot className="h-12 w-12 text-purple-400" />
              <h3 className="mt-4 text-xl font-semibold">AI-Powered Matching</h3>
              <p className="mt-2 text-gray-400">
                Our advanced AI goes beyond metrics to analyze the true vibe of influencers and brands.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <BarChart className="h-12 w-12 text-cyan-400" />
              <h3 className="mt-4 text-xl font-semibold">In-Depth Analytics</h3>
              <p className="mt-2 text-gray-400">
                Track campaign performance with aura-based insights and real-time data.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <CheckCircle className="h-12 w-12 text-green-400" />
              <h3 className="mt-4 text-xl font-semibold">Verified Influencers</h3>
              <p className="mt-2 text-gray-400">
                Connect with a curated network of trusted and authentic content creators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold">Ready to Amplify Your Aura?</h2>
          <p className="mt-4 max-w-xl mx-auto text-gray-300">
            Join AuraSight today and start building partnerships that truly connect.
          </p>
          <Button size="lg" className="mt-8 bg-gradient-to-r from-cyan-400 to-purple-500 text-white hover:opacity-90">
            Sign Up Now
          </Button>
        </div>
      </section>
    </div>
  )
}
