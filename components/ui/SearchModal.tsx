"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { LuSearch } from "@/components/icons";
import { candyIconButtonClasses, candyNavIconClasses } from "./candy-button";

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
      className="fixed inset-0 z-120 overflow-y-auto bg-black/50 backdrop-blur-sm p-4 sm:p-6"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="mx-auto mt-12 sm:mt-20 w-full max-w-2xl">
        <div className="relative overflow-hidden rounded-2xl border border-hairline bg-canvas shadow-[0_16px_48px_-12px_rgba(0,0,0,0.25)]">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-5 py-4 sm:px-6">
            <h2 className="text-title-lg text-ink">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className={candyIconButtonClasses("white", "sm")}
              aria-label="Close search"
            >
              <X className={candyNavIconClasses} strokeWidth={2.25} />
            </button>
          </div>

          {/* Search field */}
          <div className="px-5 pb-4 sm:px-6">
            <div className="relative">
              <LuSearch
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
                aria-hidden
              />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={placeholder}
                className="w-full rounded-xl border border-hairline bg-surface-soft py-3 pl-12 pr-16 text-body-md text-ink placeholder:text-muted outline-none transition focus:border-ink focus:bg-canvas focus:ring-4 focus:ring-ink/5"
              />
              <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-hairline bg-canvas px-2 py-0.5 text-[11px] font-medium text-muted">
                ESC
              </kbd>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-[min(60vh,28rem)] overflow-y-auto border-t border-hairline px-2.5 py-2.5">
            {!trimmedQuery ? (
              <div className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
                <span className={candyIconButtonClasses("white", "sm")}>
                  <LuSearch className="h-4 w-4 text-muted" aria-hidden />
                </span>
                <p className="text-body-sm text-muted">
                  Start typing to search products.
                </p>
              </div>
            ) : results.length === 0 && !loading ? (
              <div className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
                <span className={candyIconButtonClasses("white", "sm")}>
                  <LuSearch className="h-4 w-4 text-muted" aria-hidden />
                </span>
                <p className="text-body-sm text-muted">
                  No products found for{" "}
                  <span className="font-semibold text-ink">
                    &ldquo;{trimmedQuery}&rdquo;
                  </span>
                  .
                </p>
              </div>
            ) : (
              <ul className="flex flex-col gap-1">
                {results.map((item) => (
                  <li key={`${item.id}-${item.slug}`}>
                    <button
                      type="button"
                      onClick={() => handleItemClick(item.url)}
                      className="group flex w-full items-center gap-4 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-surface-card"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-12 w-12 shrink-0 rounded-lg border border-hairline bg-surface-card object-cover"
                        loading="lazy"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-title-sm text-ink">
                          {item.name}
                        </p>
                        {item.category ? (
                          <p className="truncate text-body-sm text-muted">
                            {item.category}
                          </p>
                        ) : null}
                      </div>
                      <span className="shrink-0 text-caption text-muted opacity-0 transition-opacity group-hover:opacity-100">
                        View →
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {loading ? (
              <div className="flex items-center justify-center gap-2 px-4 py-4 text-body-sm text-muted">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-hairline border-t-ink" />
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
  );
}
