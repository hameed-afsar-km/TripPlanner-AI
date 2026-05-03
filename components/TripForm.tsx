import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTripStore } from '../store/useTripStore';
import { Calendar, DollarSign, Users, Tag, ArrowRight, MapPin } from 'lucide-react';

const PREFERENCES = ['Culture', 'Food', 'Nature', 'Adventure', 'Relaxation', 'Nightlife', 'Shopping'];

export default function TripForm() {
  const { tripData, setTripData, setView } = useTripStore();
  const [destination, setDestination] = useState(tripData.destination || '');
  const [days, setDays] = useState(tripData.days || 3);
  const [budget, setBudget] = useState(tripData.budget || 'Moderate');
  const [travelers, setTravelers] = useState(tripData.travelers || 2);
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>(tripData.preferences || []);

  const togglePref = (pref: string) => {
    setSelectedPrefs(prev => 
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTripData({ destination, days, budget, travelers, preferences: selectedPrefs });
    setView('map'); // Move to map loading state
    
    // Simulate generation delay then go to result
    setTimeout(() => {
      setView('result');
    }, 2500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 flex items-center justify-center p-6 relative z-10 w-full"
    >
      <form onSubmit={handleSubmit} className="glass-panel p-8 w-full max-w-2xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Trip Details</h2>
          <p className="text-white/60">Let's fine-tune your adventure preferences.</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Destination */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" /> Destination
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="glass-input w-full p-3 text-white"
                required
              />
            </div>

            {/* Days */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400" /> Duration (Days)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value))}
                className="glass-input w-full p-3 text-white"
                required
              />
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-400" /> Budget
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="glass-input w-full p-3 text-white appearance-none bg-transparent"
              >
                <option value="Budget">Budget-friendly</option>
                <option value="Moderate">Moderate</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>

            {/* Travelers */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80 flex items-center gap-2">
                <Users className="w-4 h-4 text-orange-400" /> Travelers
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={travelers}
                onChange={(e) => setTravelers(parseInt(e.target.value))}
                className="glass-input w-full p-3 text-white"
                required
              />
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <label className="text-sm font-medium text-white/80 flex items-center gap-2">
              <Tag className="w-4 h-4 text-pink-400" /> Preferences
            </label>
            <div className="flex flex-wrap gap-2">
              {PREFERENCES.map(pref => (
                <button
                  key={pref}
                  type="button"
                  onClick={() => togglePref(pref)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedPrefs.includes(pref)
                      ? 'bg-white text-[#0A0A0B] shadow-lg shadow-white/10 border-transparent'
                      : 'bg-white/[0.03] border border-white/[0.05] text-white/70 hover:bg-white/[0.08] hover:text-white'
                  }`}
                >
                  {pref}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <button
            className="px-6 py-3 bg-white text-[#0A0A0B] rounded-xl font-bold transition-all shadow-lg shadow-white/10 hover:bg-white/90 flex items-center gap-2 group"
          >
            Generate Itinerary
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </form>
    </motion.div>
  );
}
