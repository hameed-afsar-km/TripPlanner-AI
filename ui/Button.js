"use client";

import { motion } from "framer-motion";

export function Button({ 
  children, 
  onClick, 
  variant = "primary", 
  className = "", 
  type = "button",
  disabled = false
}) {
  const baseStyles = "px-6 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "gradient-bg text-white hover:opacity-90 glow-effect",
    secondary: "bg-white/10 border border-white/20 text-white hover:bg-white/20",
    ghost: "text-gray-300 hover:text-white hover:bg-white/5",
  };

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {children}
    </motion.button>
  );
}
