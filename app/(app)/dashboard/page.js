import { AnimatedAIChat } from "@/components/ui/animated-ai-chat"
import { EtheralShadow } from "@/components/ui/etheral-shadow"

export default function DashboardPage() {
  return (
    <div className="relative flex w-full h-screen overflow-hidden bg-[#0a0f1d]">
      {/* Premium Etheral Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <EtheralShadow 
          color="rgba(139, 92, 246, 0.5)" 
          animation={{ scale: 100, speed: 70 }}
          noise={{ opacity: 0.8, scale: 1.2 }}
          sizing="fill"
        />
      </div>
      
      {/* Chat Content */}
      <div className="relative z-10 w-full overflow-x-hidden">
        <AnimatedAIChat />
      </div>
    </div>
  );
}
