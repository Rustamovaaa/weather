export function Loader({ size = "md", variant = "bounce" }: { size?: "sm" | "md" | "lg", variant?: "bounce" | "dots" | "spinner" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };
  
  const textClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl"
  };
  
  if (variant === "dots") {
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex space-x-2 sm:space-x-3">
          <div className={`${sizeClasses[size]} rounded-full bg-[#0EA5E9]/80 dark:bg-indigo-500/80 animate-pulse`}></div>
          <div className={`${sizeClasses[size]} rounded-full bg-[#0EA5E9]/80 dark:bg-indigo-500/80 animate-pulse delay-150`}></div>
          <div className={`${sizeClasses[size]} rounded-full bg-[#0EA5E9]/80 dark:bg-indigo-500/80 animate-pulse delay-300`}></div>
        </div>
        <span className={`${textClasses[size]} text-[#0EA5E9] dark:text-indigo-300 font-medium`}>Yuklanmoqda...</span>
      </div>
    );
  } 
  
  if (variant === "spinner") {
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <div className={`${sizeClasses[size]} border-4 border-[#0EA5E9]/20 dark:border-indigo-900/30 border-t-[#0EA5E9] dark:border-t-indigo-500 rounded-full animate-spin`}></div>
        <span className={`${textClasses[size]} text-[#0EA5E9] dark:text-indigo-300 font-medium`}>Yuklanmoqda...</span>
      </div>
    );
  }
  
  // Default bounce variant
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="flex space-x-2 sm:space-x-3">
        <span className={`${sizeClasses[size]} rounded-full bg-gradient-to-tr from-orange-400 to-sky-400 animate-bounce [animation-delay:-0.3s]`}></span>
        <span className={`${sizeClasses[size]} rounded-full bg-gradient-to-tr from-sky-400 to-blue-500 animate-bounce [animation-delay:-0.15s]`}></span>
        <span className={`${sizeClasses[size]} rounded-full bg-gradient-to-tr from-blue-500 to-orange-400 animate-bounce`}></span>
      </div>
      <span className={`${textClasses[size]} text-[#0EA5E9] dark:text-indigo-300 font-medium`}>Yuklanmoqda...</span>
    </div>
  );
}
