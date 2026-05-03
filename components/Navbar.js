"use client";

import Link from "next/link";
import { Button } from "@/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { Compass } from "lucide-react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  // Hide navbar on dashboard routes since they have a sidebar
  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/planner") || pathname?.startsWith("/trips") || pathname?.startsWith("/settings")) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center group-hover:scale-105 transition-transform">
            <Compass className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">AI Trip</span>
        </Link>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Button variant="secondary" onClick={() => logout()}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/login?signup=true">
                <Button variant="primary">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
