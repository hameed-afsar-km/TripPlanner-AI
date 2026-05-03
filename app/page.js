import { Navbar } from "@/components/Navbar";
import { Button } from "@/ui/Button";
import { Card } from "@/ui/Card";
import { Map, Plane, Wallet, Bot, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen pt-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        {/* Hero Section - Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          
          {/* Main Hero Card */}
          <Card className="md:col-span-2 md:row-span-2 flex flex-col justify-center relative overflow-hidden group p-10" hover={false} delay={0.1}>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 z-0 opacity-50" />
            <div className="relative z-10 max-w-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm mb-6 text-purple-300">
                <Sparkles className="w-4 h-4" /> AI-Powered Travel
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Plan Smarter Trips with <span className="gradient-text">AI</span>
              </h1>
              <p className="text-lg text-gray-400 mb-8">
                Your personal multi-agent intelligence that builds itineraries, optimizes budget, and manages travel data in real-time.
              </p>
              <Link href="/login?signup=true">
                <Button className="text-lg px-8 py-4">
                  Start Planning <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
            
            {/* Decorative background circle */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px]" />
          </Card>

          {/* Feature Card 1 */}
          <Card delay={0.2} className="flex flex-col justify-between">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
              <Map className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">AI Itinerary Builder</h3>
              <p className="text-sm text-gray-400">Generate personalized day-by-day plans in seconds.</p>
            </div>
          </Card>

          {/* Feature Card 2 */}
          <Card delay={0.3} className="flex flex-col justify-between">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400 mb-4">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Budget Optimizer</h3>
              <p className="text-sm text-gray-400">Track and forecast expenses dynamically.</p>
            </div>
          </Card>

          {/* Feature Card 3 */}
          <Card delay={0.4} className="flex flex-col justify-between">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 mb-4">
              <Plane className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Real-time Data</h3>
              <p className="text-sm text-gray-400">Live flight, weather, and venue updates.</p>
            </div>
          </Card>

          {/* Feature Card 4 */}
          <Card delay={0.5} className="md:col-span-2 flex items-center gap-6 p-8">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <Bot className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Multi-Agent Intelligence</h3>
              <p className="text-gray-400">
                Multiple AI models working together: a researcher, a budget planner, and a schedule optimizer to create your perfect trip.
              </p>
            </div>
          </Card>

        </div>
      </div>
    </main>
  );
}
