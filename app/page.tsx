"use client";

import { useTripStore } from '../store/useTripStore';
import { AnimatePresence, motion } from 'framer-motion';
import LoginCard from '../components/LoginCard';
import Sidebar from '../components/Sidebar';
import { AnimatedAIChat } from '../components/ui/animated-ai-chat';
import TripForm from '../components/TripForm';
import MapView from '../components/MapView';
import TripResults from '../components/TripResults';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function Home() {
  const { user, setUser, view } = useTripStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#020617]">
        <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <LoginCard />;
  }

  // Define transition animations
  const fadeSlideVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="flex h-screen w-full overflow-hidden text-white relative">
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-fuchsia-500/10 rounded-full mix-blend-normal filter blur-[96px] animate-pulse delay-1000" />
      </div>
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-white/[0.01]">
        {/* Navigation Header / Minimal Glass Top Bar */}
        <div className="h-16 border-b border-white/5 flex items-center px-6 justify-between shrink-0 glass rounded-none border-t-0 border-l-0 border-r-0 backdrop-blur-md z-20">
          <h1 className="text-lg font-medium text-white/80">
            {view === 'chat' && 'New Trip Generation'}
            {view === 'form' && 'Refine Details'}
            {view === 'map' && 'Mapping Itinerary'}
            {view === 'result' && 'Your Itinerary'}
          </h1>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
          </div>
        </div>

        {/* Dynamic Views */}
        <div className="flex-1 relative overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            {view === 'chat' && (
              <motion.div
                key="chat"
                variants={fadeSlideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col"
              >
                <AnimatedAIChat />
              </motion.div>
            )}

            {view === 'form' && (
              <motion.div
                key="form"
                variants={fadeSlideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col"
              >
                <TripForm />
              </motion.div>
            )}

            {view === 'map' && (
              <motion.div
                key="map"
                variants={fadeSlideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col"
              >
                <MapView />
              </motion.div>
            )}

            {view === 'result' && (
              <motion.div
                key="result"
                variants={fadeSlideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col"
              >
                <TripResults />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
