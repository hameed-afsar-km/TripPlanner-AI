import { motion, Variants } from 'framer-motion';
import { useTripStore } from '../store/useTripStore';
import { Plane, CalendarDays, MapPin, Coffee, Utensils, Moon, CheckCircle2 } from 'lucide-react';

export default function TripResults() {
  const { tripData } = useTripStore();

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  // Mock days generation based on user input
  const days = Array.from({ length: Math.min(tripData.days || 3, 5) }).map((_, i) => i + 1);

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar p-6 relative z-10 w-full">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto space-y-6 pb-24"
      >
        {/* Header Summary */}
        <motion.div variants={item} className="glass-panel p-8 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] group-hover:bg-blue-500/20 transition-colors" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 text-blue-400 mb-2">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-semibold tracking-wide uppercase text-sm">Itinerary Ready</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-2">{tripData.destination}</h2>
              <p className="text-white/60 text-lg">
                {tripData.days} Days • {tripData.travelers} Travelers • {tripData.budget} Budget
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 rounded-xl glass hover:bg-white/10 text-white font-medium transition-colors">
                Save Trip
              </button>
              <button className="px-6 py-3 rounded-xl bg-white text-[#0A0A0B] font-bold hover:bg-white/90 transition-colors shadow-lg shadow-white/10">
                Book Flights
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Insights Column */}
          <motion.div variants={item} className="space-y-6 md:col-span-1">
            <div className="glass p-6 rounded-3xl hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <Plane className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Getting There</h3>
              <p className="text-white/60 text-sm">Best time to fly is usually mid-week. Estimated flight cost is $450-$800 per person.</p>
            </div>
            
            <div className="glass p-6 rounded-3xl hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Where to Stay</h3>
              <p className="text-white/60 text-sm">Recommended area: Downtown / City Center for easy transit access and dining.</p>
            </div>
          </motion.div>

          {/* Days Column */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <CalendarDays className="w-6 h-6 text-blue-400" />
              Daily Plan
            </h3>
            
            {days.map((day) => (
              <motion.div key={day} variants={item} className="glass p-6 rounded-3xl group hover:border-white/20 transition-colors">
                <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                  Day {day}: Exploration & Culture
                </h4>
                
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1">
                      <Coffee className="w-4 h-4 text-white/70" />
                    </div>
                    <div>
                      <h5 className="text-white font-medium">Morning</h5>
                      <p className="text-white/60 text-sm">Start your day with local breakfast. Visit the main historical district.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1">
                      <Utensils className="w-4 h-4 text-white/70" />
                    </div>
                    <div>
                      <h5 className="text-white font-medium">Afternoon</h5>
                      <p className="text-white/60 text-sm">Lunch at a highly-rated spot. Museum tour or local attractions.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1">
                      <Moon className="w-4 h-4 text-white/70" />
                    </div>
                    <div>
                      <h5 className="text-white font-medium">Evening</h5>
                      <p className="text-white/60 text-sm">Dinner in the lively neighborhood. Enjoy the city lights and local nightlife.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
