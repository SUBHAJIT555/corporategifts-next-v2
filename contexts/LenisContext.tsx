// import { createContext, useContext, useEffect, useState } from 'react';
// import type { ReactNode } from 'react';
// import Lenis from '@studio-freight/lenis';

// interface LenisContextType {
//   lenis: Lenis | null;
// }

// const LenisContext = createContext<LenisContextType>({ lenis: null });

// export const useLenisContext = () => useContext(LenisContext);

// interface LenisProviderProps {
//   children: ReactNode;
// }

// export const LenisProvider = ({ children }: LenisProviderProps) => {
//   const [lenis, setLenis] = useState<Lenis | null>(null);

//   useEffect(() => {
//     // Initialize Lenis
//     const lenisInstance = new Lenis({
//       duration: 1.2,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       orientation: 'vertical',
//       gestureOrientation: 'vertical',
//       smoothWheel: true,
//       wheelMultiplier: 1,
//       touchMultiplier: 2,
//       infinite: false,
//     });

//     setLenis(lenisInstance);

//     // Animation frame loop
//     function raf(time: number) {
//       lenisInstance.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     // Cleanup
//     return () => {
//       lenisInstance.destroy();
//       setLenis(null);
//     };
//   }, []);

//   return (
//     <LenisContext.Provider value={{ lenis }}>
//       {children}
//     </LenisContext.Provider>
//   );
// };

