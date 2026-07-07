"use client";

import { useEffect, useState } from "react";
import useInView from "@/hooks/useInView";

type LazyMountOnViewProps = {
  children: React.ReactNode;
  placeholderMinHeight?: string;
  rootMargin?: string;
};

export default function LazyMountOnView({
  children,
  placeholderMinHeight = "360px",
  rootMargin = "200px",
}: LazyMountOnViewProps) {
  const { ref, inView } = useInView<HTMLDivElement>({
    once: true,
    rootMargin,
    threshold: 0,
  });
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (inView) setShouldMount(true);
  }, [inView]);

  return (
    <div ref={ref}>
      {shouldMount ? (
        children
      ) : (
        <div
          className="w-full rounded-xl bg-transparent"
          style={{ minHeight: placeholderMinHeight }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
