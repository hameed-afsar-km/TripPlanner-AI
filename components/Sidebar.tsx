import { useEffect, useState } from 'react';
import { useTripStore } from '../store/useTripStore';
import { MessageSquare, Plus, Compass, LogOut, User as UserIcon, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchConversations, deleteConversation } from '../lib/db';

import { signOut, auth } from '../lib/firebase';

export default function Sidebar() {
  const { user, conversations, setConversations, activeConversationId, setActiveConversationId, resetState, setUser, removeConversation } = useTripStore();
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      // In a real app, this might be triggered when we want to refresh
      fetchConversations(user.uid).then(setConversations);
    }
  }, [user, setConversations]);

  const handleDeleteConfirm = async () => {
    if (chatToDelete) {
      await deleteConversation(chatToDelete);
      removeConversation(chatToDelete);
      setChatToDelete(null);
    }
  };

  return (
    <>
      <div className="w-72 h-full glass border-r-0 border-t-0 border-b-0 rounded-none flex flex-col p-4 bg-white/[0.02] relative z-20">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl text-white">TripPlanner</span>
        </div>

        {/* New Chat Button */}
        <button
          onClick={resetState}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] transition-all text-white/90 mb-6 group relative overflow-hidden"
        >
          <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-medium">New Plan</span>
        </button>

        {/* History */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3 px-2">
            Recent Plans
          </p>
          <div className="space-y-1">
            {conversations.length > 0 ? (
              conversations.map(chat => (
                <div 
                  key={chat.id}
                  onClick={() => setActiveConversationId(chat.id)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer group transition-colors ${activeConversationId === chat.id ? 'bg-white/10 text-white' : 'bg-transparent text-white/60 hover:bg-white/5 hover:text-white/80'}`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    <span className="text-sm truncate">{chat.title}</span>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setChatToDelete(chat.id); }}
                    className="opacity-0 group-hover:opacity-100 text-white/40 hover:text-red-400 transition-all p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-white/30 italic">
                No recent plans.
              </div>
            )}
          </div>
        </div>

        {/* User Profile */}
        <div className="mt-auto pt-4 border-t border-white/10">
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 flex-shrink-0">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="User" className="w-full h-full rounded-full" />
                ) : (
                  <UserIcon className="w-4 h-4 text-white/70" />
                )}
              </div>
              <span className="text-sm font-medium text-white/90 truncate">
                {user?.displayName || 'Traveler'}
              </span>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-white/40 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {chatToDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0f172a] border border-white/10 p-6 rounded-3xl shadow-2xl max-w-sm w-full mx-4 relative"
            >
              <h3 className="text-xl font-bold text-white mb-2">Delete Plan</h3>
              <p className="text-white/60 text-sm mb-6">Are you sure you want to delete this trip plan? This action cannot be undone.</p>
              <div className="flex gap-3 justify-end">
                <button 
                  onClick={() => setChatToDelete(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 rounded-xl bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-colors border border-red-500/30 text-sm font-medium shadow-lg shadow-red-500/10"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
