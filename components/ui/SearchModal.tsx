"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { LuSearch } from "@/components/icons";

type SearchResult = {
  id: number | string;
  name: string;
  slug: string;
  image: string;
  category: string;
  url: string;
};

type SearchApiResponse = {
  page: number;
  hasMore: boolean;
  results: SearchResult[];
};

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  placeholder?: string;
  title?: string;
};

const DEBOUNCE_MS = 800;

const dashedGridStyle = {
  backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
  backgroundSize: "5px 5px",
  backgroundPosition: "0 0, 0 0",
  maskImage: `
       repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
          radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
      `,
  WebkitMaskImage: `
 repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
          radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
      `,
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
} as const;

export default function SearchModal({
  isOpen,
  onClose,
  placeholder = "Search products...",
  title = "Search Products",
}: SearchModalProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const trimmedQuery = useMemo(() => debouncedQuery.trim(), [debouncedQuery]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    const scrollY = window.scrollY;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 0);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      window.scrollTo(0, scrollY);
      window.clearTimeout(focusTimer);
    };
  }, [isOpen, onClose]);

  const fetchPage = useCallback(
    async (nextPage: number, replace: boolean) => {
      if (!trimmedQuery) {
        setResults([]);
        setHasMore(false);
        setPage(1);
        return;
      }

      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setLoading(true);

      try {
        const url = `/blog/wp-json/custom/v1/product-search?term=${encodeURIComponent(trimmedQuery)}&page=${nextPage}`;
        const response = await fetch(url, {
          method: "GET",
          signal: controller.signal,
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Search request failed: ${response.status}`);
        }

        const data = (await response.json()) as SearchApiResponse;
        const nextResults = Array.isArray(data.results) ? data.results : [];

        setResults((prev) => (replace ? nextResults : [...prev, ...nextResults]));
        setPage(data.page ?? nextPage);
        setHasMore(Boolean(data.hasMore));
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setHasMore(false);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    },
    [trimmedQuery]
  );

  useEffect(() => {
    abortControllerRef.current?.abort();
    setResults([]);
    setPage(1);
    setHasMore(false);

    if (!trimmedQuery) {
      setLoading(false);
      return;
    }

    fetchPage(1, true);
  }, [trimmedQuery, fetchPage]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
      observerRef.current?.disconnect();
    };
  }, []);

  const loadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      observerRef.current?.disconnect();
      if (!node) return;

      observerRef.current = new IntersectionObserver((entries) => {
        const first = entries[0];
        if (!first?.isIntersecting || loading || !hasMore || !trimmedQuery) return;
        fetchPage(page + 1, false);
      });

      observerRef.current.observe(node);
    },
    [fetchPage, hasMore, loading, page, trimmedQuery]
  );

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleItemClick = (url: string) => {
    onClose();
    router.push(url);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-120 overflow-y-auto bg-neutral-900/40 backdrop-blur-sm"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="mx-auto mt-16 w-full max-w-3xl px-4 sm:px-6 pb-8">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-300 bg-white shadow-xl ring ring-neutral-300 ring-offset-2 md:ring-offset-4 ">
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={dashedGridStyle}
            aria-hidden="true"
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between gap-3 border-b border-neutral-300 px-4 py-4 sm:px-6">
              <h2 className="text-[#0F5C85] text-lg sm:text-xl font-sentient font-bold border border-neutral-300 ring ring-neutral-300 ring-offset-2 px-3 py-1 rounded-xl bg-neutral-100">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-neutral-100 p-2 text-[#0F5C85] ring ring-neutral-300 ring-offset-2 transition-colors hover:bg-neutral-200 hover:text-[#0F5C85]"
                aria-label="Close search"
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <div className="relative">
                <LuSearch
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#0F5C85]"
                  aria-hidden
                />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={placeholder}
                  className="w-full rounded-full border border-neutral-300 bg-neutral-100 py-3.5 pl-12 pr-4 font-switzer text-base text-neutral-800 placeholder:text-neutral-500 outline-none ring ring-neutral-300 ring-offset-2 transition focus:border-[#0F5C85] focus:ring-[#0F5C85]/30"
                />
              </div>

              <div className="relative mt-4 max-h-[60vh] overflow-hidden rounded-xl border border-neutral-300 bg-white ring ring-neutral-200 ring-offset-2">
                <div
                  className="pointer-events-none absolute inset-0 opacity-40"
                  style={dashedGridStyle}
                  aria-hidden="true"
                />

                <div className="relative max-h-[60vh] overflow-y-auto">
                  {!trimmedQuery ? (
                    <div className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
                      <span className="inline-flex rounded-xl border border-neutral-300 bg-neutral-100 p-3 ring ring-neutral-300 ring-offset-2">
                        <LuSearch className="h-8 w-8 text-[#0F5C85]" aria-hidden />
                      </span>
                      <p className="font-switzer text-sm sm:text-base font-medium text-neutral-700">
                        Start typing to search products.
                      </p>
                    </div>
                  ) : results.length === 0 && !loading ? (
                    <p className="px-6 py-12 text-center font-switzer text-sm sm:text-base font-medium text-neutral-700">
                      No products found for &ldquo;{trimmedQuery}&rdquo;.
                    </p>
                  ) : (
                    <ul className="divide-y divide-neutral-200">
                      {results.map((item) => (
                        <li key={`${item.id}-${item.slug}`}>
                          <button
                            type="button"
                            onClick={() => handleItemClick(item.url)}
                            className="group flex w-full items-center gap-4 px-4 py-3.5 text-left transition-colors hover:bg-[#A8DDF0]/25 sm:px-5"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-14 w-14 shrink-0 rounded-lg border border-neutral-200 bg-neutral-100 object-cover ring ring-neutral-200 ring-offset-1"
                              loading="lazy"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="truncate font-sentient text-sm font-semibold text-[#0F5C85] transition-colors group-hover:text-[#0F5C85] sm:text-base">
                                {item.name}
                              </p>
                              {item.category ? (
                                <p className="truncate font-switzer text-xs text-neutral-600 sm:text-sm">
                                  {item.category}
                                </p>
                              ) : null}
                            </div>
                            <span className="shrink-0 font-switzer text-xs font-medium text-[#0F5C85] opacity-0 transition-opacity group-hover:opacity-100">
                              View
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  {loading ? (
                    <div className="flex items-center justify-center gap-2 border-t border-neutral-200 px-4 py-4 font-switzer text-sm font-medium text-neutral-700">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-[#0F5C85]" />
                      <span>Searching products…</span>
                    </div>
                  ) : null}

                  {trimmedQuery && hasMore ? (
                    <div ref={loadMoreRef} className="h-1 w-full" />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
