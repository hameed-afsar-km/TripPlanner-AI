import { Card } from "@/ui/Card";
import { Button } from "@/ui/Button";
import { Plus, Calendar, MapPin, Users } from "lucide-react";
import Link from "next/link";

const MOCK_TRIPS = [
  {
    id: 1,
    destination: "Paris, France",
    dates: "Oct 12 - Oct 18, 2024",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=800",
    status: "Upcoming",
    travelers: 2
  },
  {
    id: 2,
    destination: "Tokyo, Japan",
    dates: "Dec 5 - Dec 20, 2024",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800",
    status: "Planning",
    travelers: 1
  },
  {
    id: 3,
    destination: "Amalfi Coast, Italy",
    dates: "Jun 10 - Jun 15, 2024",
    image: "https://images.unsplash.com/photo-1533682805518-48d1f5a8cb3d?auto=format&fit=crop&q=80&w=800",
    status: "Completed",
    travelers: 4
  },
  {
    id: 4,
    destination: "Bali, Indonesia",
    dates: "Feb 1 - Feb 14, 2025",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800",
    status: "Planning",
    travelers: 2
  }
];

export default function TripsPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">My Trips</h1>
          <p className="text-gray-400">Manage all your upcoming and past adventures.</p>
        </div>
        <Link href="/planner">
          <Button>
            <Plus className="w-5 h-5" /> New Trip
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_TRIPS.map((trip, idx) => (
          <div 
            key={trip.id} 
            className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer shadow-xl"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* Background Image with Hover Zoom */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={trip.image} 
                alt={trip.destination} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>

            {/* Content (Glass overlay at bottom) */}
            <div className="absolute bottom-0 left-0 right-0 p-5 glass-card m-3 rounded-xl border-white/20 transform transition-transform duration-300 group-hover:translate-y-0">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white">{trip.destination}</h3>
                <span className={`text-xs px-2 py-1 rounded-full border ${
                  trip.status === 'Upcoming' ? 'bg-green-500/20 text-green-300 border-green-500/30' : 
                  trip.status === 'Planning' ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                  'bg-gray-500/20 text-gray-300 border-gray-500/30'
                }`}>
                  {trip.status}
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  {trip.dates}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-blue-400" />
                  {trip.travelers}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
