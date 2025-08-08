"use client";
import { motion } from "motion/react";

interface ErrorMessageProps {
  message?: string;
  title?: string;
  onRetry?: () => void;
}

export function ErrorMessage({ 
  message = "Oops! Something went wrong.", 
  title = "Xatolik yuz berdi",
  onRetry
}: ErrorMessageProps) {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center gap-3 sm:gap-4 p-4 sm:p-6 md:p-8 max-w-md mx-auto w-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div 
        className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center mb-1 sm:mb-2"
        initial={{ rotate: -10 }}
        animate={{ rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-red-500 to-[#0EA5E9] rounded-full opacity-80 blur-md" />
        <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center bg-gradient-to-tr from-red-500 to-[#0EA5E9] rounded-full shadow-lg relative z-10">
          <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-12 md:h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </motion.div>
      
      <motion.h2 
        className="text-xl sm:text-2xl font-bold text-[#0EA5E9] dark:text-[#38bdf8] text-center"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {title}
      </motion.h2>
      
      <motion.p 
        className="text-sm sm:text-base text-slate-600 dark:text-slate-300 text-center max-w-xs"
        initial={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {message}
      </motion.p>
      
      {onRetry && (
        <motion.button
          className="mt-3 sm:mt-4 px-4 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-[#0EA5E9] to-[#38bdf8] text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 text-sm sm:text-base"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Qayta urinib ko'rish
        </motion.button>
      )}
    </motion.div>
  );
}
