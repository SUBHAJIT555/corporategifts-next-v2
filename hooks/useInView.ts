import { useCallback, useEffect, useRef, useState } from "react";

interface InViewOptions extends IntersectionObserverInit {
  once?: boolean;
}

export default function useInView<T extends HTMLElement>(
  { once = true, ...observerOptions }: InViewOptions = {}
) {
  const [inView, setInView] = useState(false);
  const [node, setNode] = useState<T | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const thresholdKey = Array.isArray(observerOptions.threshold)
    ? observerOptions.threshold.join(",")
    : String(observerOptions.threshold ?? "");

  const ref = useCallback(
    (node: T | null) => {
      setNode(node);
    },
    []
  );

  useEffect(() => {
    if (!node) return;
    if (once && inView) return;

    observerRef.current?.disconnect();

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) {
          observer.disconnect();
          observerRef.current = null;
        }
      } else if (!once) {
        setInView(false);
      }
    }, observerOptions);

    observerRef.current = observer;
    observer.observe(node);

    return () => {
      observer.disconnect();
      if (observerRef.current === observer) {
        observerRef.current = null;
      }
    };
  }, [
    node,
    once,
    inView,
    observerOptions.root,
    observerOptions.rootMargin,
    thresholdKey,
  ]);

  return { ref, inView } as const;
}
