import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';
import { signInWithPopup, googleProvider, auth } from '../lib/firebase';
import { useTripStore } from '../store/useTripStore';

export default function LoginCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useTripStore((state) => state.setUser);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser({
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      });
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate email login
    setUser({
      uid: '123',
      email,
      displayName: email.split('@')[0],
      photoURL: null,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 relative overflow-hidden">
      {/* Glowing Orbs Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-blue-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-purple-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="glass-panel w-full max-w-md p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-2">TripPlanner AI</h1>
          <p className="text-white/60">Your intelligent travel companion</p>
        </div>

        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-input w-full py-3 pl-10 pr-4 text-white"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input w-full py-3 pl-10 pr-4 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-white text-[#0A0A0B] hover:bg-white/90 rounded-xl font-bold transition-all shadow-lg shadow-white/10 flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" />
            Sign In
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-white/40 text-sm">or continue with</span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full py-3 px-4 bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] text-white/90 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </button>
      </motion.div>
    </div>
  );
}
