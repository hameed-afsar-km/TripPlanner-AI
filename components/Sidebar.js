"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Plus, MessageSquare, LogOut, Compass, Settings, User } from "lucide-react";
import { motion } from "framer-motion";

export function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  const chatHistory = [
    { id: 1, title: "Kyoto Autumn Escape", date: "Today" },
    { id: 2, title: "Paris Honeymoon", date: "Yesterday" },
    { id: 3, title: "Bali Retreat", date: "Previous 7 Days" },
    { id: 4, title: "Tokyo Adventure", date: "Previous 7 Days" },
  ];

  return (
    <div className="w-64 h-screen fixed left-0 top-0 border-r border-white/10 bg-[#0a0f1d] flex flex-col z-40">
      {/* Brand & New Chat */}
      <div className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2 mb-6 px-2">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <Compass className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-lg">AI Trip</span>
        </Link>
        
        <Link href="/dashboard">
          <button className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white">
            <div className="flex items-center gap-2 font-medium">
              <Plus className="w-5 h-5" /> New Trip
            </div>
          </button>
        </Link>
      </div>

      {/* History */}
      <div className="flex-1 overflow-y-auto px-3 custom-scrollbar">
        <div className="space-y-6 mt-4">
          {/* Grouped History Example */}
          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold text-gray-500 mb-2">Today</p>
            {chatHistory.filter(c => c.date === "Today").map(chat => (
              <button key={chat.id} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-white/5 transition-colors text-sm text-left truncate">
                <MessageSquare className="w-4 h-4 shrink-0 text-gray-400" />
                <span className="truncate">{chat.title}</span>
              </button>
            ))}
          </div>

          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold text-gray-500 mb-2">Previous 7 Days</p>
            {chatHistory.filter(c => c.date !== "Today").map(chat => (
              <button key={chat.id} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-white/5 transition-colors text-sm text-left truncate">
                <MessageSquare className="w-4 h-4 shrink-0 text-gray-400" />
                <span className="truncate">{chat.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Profile Settings */}
      <div className="p-4 border-t border-white/10">
        <Link href="/settings" className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-300 hover:bg-white/5 transition-colors text-sm mb-1">
          <Settings className="w-4 h-4 shrink-0" />
          <span>Settings</span>
        </Link>
        <button 
          onClick={() => logout()} 
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
}
