import React from "react";
import { motion } from "@/lib/optimized-imports";
import { cn } from "@/lib/utils";

export interface PokeBallIconProps {
  className?: string;
}

export const PokeBallIcon: React.FC<PokeBallIconProps> = ({ className }) => (
  <motion.div
    className={cn(
      "relative w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center",
      className
    )}
    whileHover={{ rotate: 360 }}
    transition={{ duration: 0.6 }}
  >
    <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-800 z-10"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-gray-800 z-20"></div>
    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-br from-gray-100 to-white rounded-b-full"></div>
  </motion.div>
);

export default PokeBallIcon;
