"use client";

import { useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useShopStore } from "@/stores/useShopStore";

type UseShopRouterSyncArgs = {
  initialPage?: number;
  totalPages?: number;
  hasResolvedProducts?: boolean;
};

let pendingShopUrl: string | null = null;

const parseShopPageFromPath = (pathname: string, fallbackPage: number) => {
  const match = pathname.match(/\/shop(?:\/page\/(\d+))?/);
  const pageFromPath = match?.[1] ? Number.parseInt(match[1], 10) : fallbackPage;

  if (!pageFromPath || Number.isNaN(pageFromPath) || pageFromPath < 1) {
    return 1;
  }

  return pageFromPath;
};

export const getShopUrl = (category: string | null, page: number) => {
  const params = new URLSearchParams();

  if (category) {
    params.set("category", category);
  }

  const queryString = params.toString();
  const safePage = page < 1 ? 1 : page;
  const basePath = safePage === 1 ? "/shop" : `/shop/page/${safePage}`;

  return queryString ? `${basePath}?${queryString}` : basePath;
};

export const useShopRouterSync = ({
  initialPage = 1,
  totalPages,
  hasResolvedProducts = false,
}: UseShopRouterSyncArgs) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedCategory = useShopStore((state) => state.selectedCategory);
  const currentPage = useShopStore((state) => state.currentPage);
  const setSelectedCategory = useShopStore(
    (state) => state.setSelectedCategory,
  );
  const setCurrentPage = useShopStore((state) => state.setCurrentPage);
  const currentUrl = `${pathname}${searchParams.size ? `?${searchParams.toString()}` : ""}`;

  useEffect(() => {
    if (pendingShopUrl) {
      if (currentUrl === pendingShopUrl) {
        pendingShopUrl = null;
      } else {
        return;
      }
    }

    const categoryFromUrl = searchParams.get("category");
    const safePage = parseShopPageFromPath(pathname, initialPage);
    const normalizedCategory = categoryFromUrl ?? null;

    if (selectedCategory !== normalizedCategory) {
      setSelectedCategory(normalizedCategory);
    }

    if (currentPage !== safePage) {
      setCurrentPage(safePage);
    }

    if (safePage === 1 && pathname.startsWith("/shop/page/1")) {
      const canonicalUrl = getShopUrl(normalizedCategory, 1);
      pendingShopUrl = canonicalUrl;
      router.replace(canonicalUrl, { scroll: false });
    }
  }, [
    currentUrl,
    currentPage,
    initialPage,
    pathname,
    router,
    searchParams,
    selectedCategory,
    setCurrentPage,
    setSelectedCategory,
  ]);

  useEffect(() => {
    if (!hasResolvedProducts || currentPage <= 1) {
      return;
    }

    const safeTotalPages = totalPages ?? 1;
    if (currentPage <= safeTotalPages) {
      return;
    }

    setCurrentPage(1);
    const nextUrl = getShopUrl(selectedCategory, 1);
    pendingShopUrl = nextUrl;
    router.replace(nextUrl, { scroll: false });
  }, [
    currentPage,
    hasResolvedProducts,
    router,
    selectedCategory,
    setCurrentPage,
    totalPages,
  ]);
};

export const useShopNavigation = () => {
  const router = useRouter();
  const selectedCategory = useShopStore((state) => state.selectedCategory);
  const currentPage = useShopStore((state) => state.currentPage);
  const setSelectedCategory = useShopStore(
    (state) => state.setSelectedCategory,
  );
  const setCurrentPage = useShopStore((state) => state.setCurrentPage);

  const selectCategory = useCallback(
    (category: string | null) => {
      if (selectedCategory === category && currentPage === 1) {
        return;
      }
      const nextUrl = getShopUrl(category, 1);
      pendingShopUrl = nextUrl;
      setSelectedCategory(category);
      setCurrentPage(1);
      router.replace(nextUrl, { scroll: false });
    },
    [currentPage, router, selectedCategory, setCurrentPage, setSelectedCategory],
  );

  const goToPage = useCallback(
    (page: number) => {
      const safePage = page < 1 ? 1 : page;
      if (safePage === currentPage) {
        return;
      }
      const nextUrl = getShopUrl(selectedCategory, safePage);
      pendingShopUrl = nextUrl;
      setCurrentPage(safePage);
      router.replace(nextUrl, { scroll: false });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [currentPage, router, selectedCategory, setCurrentPage],
  );

  return {
    goToPage,
    selectCategory,
  };
};
