"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Sidebar } from "@/components/Sidebar";
import { EtheralShadow } from "@/components/ui/etheral-shadow";

export default function AppLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // In a real app we'd redirect to login, but for UI demo purposes
      // we might let them see it if they bypassed it.
      // router.push("/login"); 
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1d] flex relative overflow-hidden">
      {/* Global Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
        <EtheralShadow 
          color="rgba(139, 92, 246, 0.4)" 
          animation={{ scale: 80, speed: 50 }}
          noise={{ opacity: 0.5, scale: 1.2 }}
          sizing="fill"
        />
      </div>

      <Sidebar />
      <main className="flex-1 ml-64 p-8 relative z-10 overflow-y-auto h-screen custom-scrollbar">
        {children}
      </main>
    </div>
  );
}
