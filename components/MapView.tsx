import { motion } from 'framer-motion';
import { useTripStore } from '../store/useTripStore';
import { Map as MapIcon, Loader2 } from 'lucide-react';

export default function MapView() {
  const { tripData } = useTripStore();
  
  const encodedDestination = encodeURIComponent(tripData.destination || 'World');

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 flex flex-col p-6 relative z-10 w-full h-full"
    >
      <div className="glass-panel w-full h-full rounded-3xl overflow-hidden relative flex flex-col">
        <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between z-10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <MapIcon className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-white">Mapping {tripData.destination}</h3>
              <p className="text-xs text-white/50">Generating optimized routes...</p>
            </div>
          </div>
          <div className="flex items-center text-blue-400 text-sm gap-2 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
            <Loader2 className="w-4 h-4 animate-spin" />
            Processing Itinerary
          </div>
        </div>
        
        <div className="flex-1 relative bg-slate-900">
          {/* We use a simple iframe for the google maps preview without needing an API key for the demo */}
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src={`https://maps.google.com/maps?q=${encodedDestination}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
            className="absolute inset-0 grayscale-[50%] contrast-[1.2] opacity-80"
          ></iframe>
          
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
        </div>
      </div>
    </motion.div>
  );
}
