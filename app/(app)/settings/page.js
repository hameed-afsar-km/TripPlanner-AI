"use client";

import { useAuth } from "@/context/AuthContext";
import { Card } from "@/ui/Card";
import { Button } from "@/ui/Button";
import { User, Mail, Shield, Bell, CreditCard, LogOut, Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Account Settings</h1>
        <p className="text-gray-400">Manage your profile, preferences, and billing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Sidebar (Settings Navigation) */}
        <div className="md:col-span-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-white border border-white/5 transition-colors">
            <User className="w-5 h-5 text-purple-400" />
            <span className="font-medium">Profile</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="font-medium">Notifications</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <CreditCard className="w-5 h-5" />
            <span className="font-medium">Billing</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <Shield className="w-5 h-5" />
            <span className="font-medium">Security</span>
          </button>
        </div>

        {/* Right Content */}
        <div className="md:col-span-2 space-y-6">
          <Card hover={false} className="p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-400" /> Profile Information
            </h2>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-2xl font-bold">
                {user?.email?.charAt(0).toUpperCase() || "A"}
              </div>
              <div>
                <Button variant="secondary" className="text-sm py-2">Change Avatar</Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Display Name</label>
                <input 
                  type="text" 
                  defaultValue={user?.displayName || "Traveler"} 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="email" 
                    defaultValue={user?.email || "user@example.com"} 
                    disabled
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-gray-400 cursor-not-allowed" 
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </Card>

          <Card hover={false} className="p-8 border-red-500/20 bg-red-500/5">
            <h2 className="text-xl font-bold text-red-400 mb-2">Danger Zone</h2>
            <p className="text-sm text-gray-400 mb-6">Once you delete your account, there is no going back. Please be certain.</p>
            <div className="flex items-center justify-between">
              <Button variant="secondary" onClick={() => logout()} className="border-white/10 hover:bg-red-500/20 hover:text-red-400">
                <LogOut className="w-4 h-4" /> Log out of all devices
              </Button>
              <button className="text-red-400 text-sm font-medium hover:text-red-300">
                Delete Account
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
