"use client";

import { useState } from "react";
import { Card } from "@/ui/Card";
import { Button } from "@/ui/Button";
import { MapPin, Calendar, DollarSign, Wand2, Map as MapIcon, Coffee, Utensils, Bed } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PlannerPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    // Simulate AI generation time
    setTimeout(() => {
      setIsGenerating(false);
      setShowResult(true);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 h-[calc(100vh-8rem)]">
      
      {/* Left: Input Form */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">AI Trip Planner</h1>
          <p className="text-gray-400">Tell us what you want, we'll handle the rest.</p>
        </div>

        <Card className="flex-1 overflow-y-auto custom-scrollbar p-6" hover={false}>
          <form onSubmit={handleGenerate} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="e.g. Kyoto, Japan" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all" defaultValue="Kyoto, Japan" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Dates</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Oct 12 - Oct 15" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all" defaultValue="Oct 12 - Oct 15" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Budget (per person)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select className="w-full bg-[#161b2c] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500 transition-all appearance-none">
                  <option value="budget">Budget ($)</option>
                  <option value="moderate" selected>Moderate ($$)</option>
                  <option value="luxury">Luxury ($$$)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Preferences</label>
              <div className="flex flex-wrap gap-2">
                {['Culture', 'Nature', 'Foodie', 'Relaxation', 'Adventure'].map((tag, i) => (
                  <button type="button" key={tag} className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${i === 0 || i === 2 ? 'bg-purple-500/20 border-purple-500/50 text-purple-200' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}`}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full mt-4" disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating Magic...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" /> Generate Itinerary
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>

      {/* Right: Output Section */}
      <div className="w-full lg:w-2/3">
        <AnimatePresence mode="wait">
          {!showResult && !isGenerating ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="h-full flex items-center justify-center border-2 border-dashed border-white/10 rounded-2xl bg-white/5"
            >
              <div className="text-center p-8 max-w-sm">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <MapIcon className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-300 mb-2">Ready to explore?</h3>
                <p className="text-gray-500">Fill out your preferences on the left and let our AI agents craft your perfect trip.</p>
              </div>
            </motion.div>
          ) : showResult ? (
            <motion.div 
              key="result"
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="h-full overflow-y-auto custom-scrollbar pr-2 space-y-6"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold">Your Kyoto Itinerary</h2>
                <div className="flex gap-2">
                  <Button variant="secondary" className="py-1.5 px-4 text-sm">Save</Button>
                  <Button variant="primary" className="py-1.5 px-4 text-sm">Share</Button>
                </div>
              </div>

              {/* Day 1 */}
              <Card className="p-6" hover={false} delay={0.1}>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm">D1</span>
                  Arrival & Eastern Kyoto
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <Bed className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white">Check-in at Kyoto Granbell Hotel</h4>
                      <p className="text-sm text-gray-400 mt-1">Modern design meets traditional elements. Great location in Gion.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <MapIcon className="w-6 h-6 text-orange-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white">Kiyomizu-dera Temple</h4>
                      <p className="text-sm text-gray-400 mt-1">Iconic temple with a wooden stage. Best visited in the late afternoon for golden hour.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <Utensils className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white">Dinner at Gion Karyo</h4>
                      <p className="text-sm text-gray-400 mt-1">Traditional Kaiseki dining experience in the heart of the geisha district.</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Day 2 */}
              <Card className="p-6" hover={false} delay={0.2}>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm">D2</span>
                  Arashiyama & Bamboo Grove
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <Coffee className="w-6 h-6 text-yellow-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white">% Arabica Kyoto Arashiyama</h4>
                      <p className="text-sm text-gray-400 mt-1">Grab a coffee while overlooking the Katsura River before the crowds arrive.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <MapIcon className="w-6 h-6 text-green-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white">Arashiyama Bamboo Grove</h4>
                      <p className="text-sm text-gray-400 mt-1">Walk through the towering bamboo stalks. A must-see iconic Kyoto experience.</p>
                    </div>
                  </div>
                </div>
              </Card>

            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
