import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTripStore } from '../store/useTripStore';
import { Send, MapPin, Sparkles } from 'lucide-react';

export default function ChatBox() {
  const [input, setInput] = useState('');
  const { addMessage, chatHistory, setView, setTripData } = useTripStore();

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    addMessage({ id: Date.now().toString(), role: 'user', content: input });
    
    // Simulate AI thinking and transitioning state
    setTimeout(() => {
      addMessage({ 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: "I'll help you plan that trip! Let me gather some more details." 
      });
      
      // Auto-extract mock destination based on keywords (rudimentary)
      let destination = '';
      if (input.toLowerCase().includes('tokyo')) destination = 'Tokyo, Japan';
      else if (input.toLowerCase().includes('paris')) destination = 'Paris, France';
      else if (input.toLowerCase().includes('new york')) destination = 'New York, USA';

      if (destination) {
        setTripData({ destination });
      }

      // Transition to form view after short delay
      setTimeout(() => {
        setView('form');
      }, 1000);
    }, 600);

    setInput('');
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full p-4 relative z-10">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {chatHistory.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
              <Sparkles className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Where do you want to go?</h2>
            <p className="text-white/60 max-w-md">
              Ask me to plan a trip anywhere in the world. E.g., "Plan a 5-day trip to Tokyo."
            </p>
          </div>
        ) : (
          <div className="space-y-6 pt-8">
            <AnimatePresence>
              {chatHistory.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div 
                    className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none shadow-blue-500/20 shadow-lg' 
                        : 'glass text-white/90 rounded-tl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="absolute bottom-8 left-4 right-4 flex justify-center">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-3xl glass-panel rounded-full p-2 pl-6 flex items-center shadow-2xl shadow-blue-900/20"
        >
          <MapPin className="w-5 h-5 text-white/40 mr-3" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="I want to plan a trip to Tokyo for 5 days..."
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 text-lg"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-12 h-12 bg-white text-blue-900 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-2"
          >
            <Send className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
