"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductsApi } from "@/lib/api/endpoints";
import type {
  PaginatedProductsResponse,
  ProductCategory,
} from "@/lib/api/types";

export const SHOP_PER_PAGE = 12;

type AsyncState<T> = {
  data: T | undefined;
  dataKey: string | null;
  error: Error | null;
  isLoading: boolean;
  isFetched: boolean;
  isPlaceholderData: boolean;
};

type UseProductsArgs = {
  category: string | null;
  page: number;
  perPage?: number;
};

const productsCache = new Map<string, PaginatedProductsResponse>();
const productRequests = new Map<string, Promise<PaginatedProductsResponse>>();
let categoriesCache: ProductCategory[] | undefined;
let categoriesRequest: Promise<ProductCategory[]> | null = null;

const normalizeError = (error: unknown) => {
  return error instanceof Error ? error : new Error("Something went wrong");
};

const getProductsKey = ({
  category,
  page,
  perPage,
}: Required<UseProductsArgs>) => {
  return `${category ?? "all"}:${page}:${perPage}`;
};

const fetchProductsCached = async ({
  category,
  page,
  perPage,
}: Required<UseProductsArgs>) => {
  const key = getProductsKey({ category, page, perPage });
  const cached = productsCache.get(key);

  if (cached) {
    return cached;
  }

  const pendingRequest = productRequests.get(key);
  if (pendingRequest) {
    return pendingRequest;
  }

  const request = (async () => {
    const data = category
      ? await ProductsApi.byCategory({
          categorySlug: category,
          page,
          per_page: perPage,
        })
      : await ProductsApi.all({
          page,
          per_page: perPage,
        });

    productsCache.set(key, data);
    return data;
  })().finally(() => {
    productRequests.delete(key);
  });

  productRequests.set(key, request);
  return request;
};

const fetchCategoriesCached = async () => {
  if (categoriesCache) {
    return categoriesCache;
  }

  if (categoriesRequest) {
    return categoriesRequest;
  }

  categoriesRequest = ProductsApi.categories()
    .then((data) => {
      categoriesCache = data;
      return data;
    })
    .finally(() => {
      categoriesRequest = null;
    });

  return categoriesRequest;
};

export const useProducts = ({
  category,
  page,
  perPage = SHOP_PER_PAGE,
}: UseProductsArgs): AsyncState<PaginatedProductsResponse> => {
  const normalizedPage = page < 1 ? 1 : page;
  const key = useMemo(
    () =>
      getProductsKey({
        category,
        page: normalizedPage,
        perPage,
      }),
    [category, normalizedPage, perPage],
  );

  const [state, setState] = useState<AsyncState<PaginatedProductsResponse>>(
    () => {
      const cached = productsCache.get(key);
      return {
        data: cached,
        dataKey: cached ? key : null,
        error: null,
        isLoading: !cached,
        isFetched: Boolean(cached),
        isPlaceholderData: false,
      };
    },
  );

  useEffect(() => {
    let cancelled = false;
    const cached = productsCache.get(key);

    if (cached) {
      setState({
        data: cached,
        dataKey: key,
        error: null,
        isLoading: false,
        isFetched: true,
        isPlaceholderData: false,
      });
      return;
    }

    setState((previousState) => ({
      data: previousState.data,
      dataKey: previousState.dataKey,
      error: null,
      isLoading: true,
      isFetched: previousState.isFetched,
      isPlaceholderData:
        previousState.data !== undefined && previousState.dataKey !== key,
    }));

    fetchProductsCached({
      category,
      page: normalizedPage,
      perPage,
    })
      .then((data) => {
        if (cancelled) {
          return;
        }

        setState({
          data,
          dataKey: key,
          error: null,
          isLoading: false,
          isFetched: true,
          isPlaceholderData: false,
        });
      })
      .catch((error) => {
        if (cancelled) {
          return;
        }

        setState((previousState) => ({
          data: previousState.data,
          dataKey: previousState.dataKey,
          error: normalizeError(error),
          isLoading: false,
          isFetched: true,
          isPlaceholderData:
            previousState.data !== undefined && previousState.dataKey !== key,
        }));
      });

    return () => {
      cancelled = true;
    };
  }, [category, key, normalizedPage, perPage]);

  return state;
};

export const useProductCategories = (): AsyncState<ProductCategory[]> => {
  const [state, setState] = useState<AsyncState<ProductCategory[]>>(() => ({
    data: categoriesCache,
    dataKey: categoriesCache ? "categories" : null,
    error: null,
    isLoading: !categoriesCache,
    isFetched: Boolean(categoriesCache),
    isPlaceholderData: false,
  }));

  useEffect(() => {
    let cancelled = false;

    if (categoriesCache) {
      setState({
        data: categoriesCache,
        dataKey: "categories",
        error: null,
        isLoading: false,
        isFetched: true,
        isPlaceholderData: false,
      });
      return;
    }

    setState((previousState) => ({
      data: previousState.data,
      dataKey: previousState.dataKey,
      error: null,
      isLoading: true,
      isFetched: previousState.isFetched,
      isPlaceholderData: false,
    }));

    fetchCategoriesCached()
      .then((data) => {
        if (cancelled) {
          return;
        }

        setState({
          data,
          dataKey: "categories",
          error: null,
          isLoading: false,
          isFetched: true,
          isPlaceholderData: false,
        });
      })
      .catch((error) => {
        if (cancelled) {
          return;
        }

        setState({
          data: undefined,
          dataKey: null,
          error: normalizeError(error),
          isLoading: false,
          isFetched: true,
          isPlaceholderData: false,
        });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
};
