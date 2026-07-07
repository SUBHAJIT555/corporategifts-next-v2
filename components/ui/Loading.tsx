// import { motion } from "framer-motion";
import { cn } from "../../lib/utilts";
import "./Loading.css";
import { useMemo } from "react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  message?: string;
  className?: string;
}

const Loading = ({
  size = "md",
  fullScreen = false,
  message,
  className
}: LoadingProps) => {
  const sizeClasses = {
    sm: "loader-sm",
    md: "loader-md",
    lg: "loader-lg",
  };

  const LoaderContent = useMemo(() => (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      {/* Animated Loader */}
      <span className={cn("loader", sizeClasses[size])}></span>

      {/* Optional message */}
      {message && (
        <p className="text-sm sm:text-base font-switzer text-textcolor/70 text-center">
          {message}
        </p>
      )}
    </div>
  ), [size, message, className]);

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm">
        {LoaderContent}
      </div>
    );
  }

  return LoaderContent;
};

// Alternative Loading Component with Pulse Animation
// export const LoadingPulse = ({
//   size = "md",
//   fullScreen = false,
//   message,
//   className
// }: LoadingProps) => {
//   const sizeClasses = {
//     sm: "w-8 h-8",
//     md: "w-12 h-12",
//     lg: "w-16 h-16",
//   };

//   const LoaderContent = useMemo(() => (
//     <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
//       {/* Pulsing circles */}
//       <div className="relative">
//         {[0, 1, 2].map((index) => (
//           <motion.div
//             key={index}
//             className={cn(
//               "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-textcolor",
//               sizeClasses[size]
//             )}
//             animate={{
//               scale: [0, 1.2, 0],
//               opacity: [0.8, 0, 0],
//             }}
//             transition={{
//               duration: 1.5,
//               repeat: Infinity,
//               delay: index * 0.3,
//               ease: "easeOut",
//             }}
//           />
//         ))}
//       </div>

//       {message && (
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="text-sm sm:text-base font-switzer text-textcolor/70 text-center"
//         >
//           {message}
//         </motion.p>
//       )}
//     </div>
//   ), [size, message, className]);

//   if (fullScreen) {
//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm">
//         {LoaderContent}
//       </div>
//     );
//   }

//   return LoaderContent;
// };

// // Skeleton Loading Component
// export const LoadingSkeleton = ({
//   className,
//   count = 1
// }: {
//   className?: string;
//   count?: number;
// }) => {
//   return (
//     <>
//       {Array.from({ length: count }).map((_, index) => (
//         <motion.div
//           key={index}
//           className={cn(
//             "bg-gray-200 rounded-lg animate-pulse",
//             className
//           )}
//           initial={{ opacity: 0.6 }}
//           animate={{ opacity: [0.6, 1, 0.6] }}
//           transition={{
//             duration: 1.5,
//             repeat: Infinity,
//             delay: index * 0.1,
//           }}
//         />
//       ))}
//     </>
//   );
// };

export default Loading;

