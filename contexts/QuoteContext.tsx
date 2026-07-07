"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "../services/api";


export interface QuoteItem extends Product {
  quantity: number;
}

interface QuoteContextType {
  items: QuoteItem[];
  addToQuote: (product: Product, quantity?: number) => void;
  removeFromQuote: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearQuote: () => void;
  getTotalItems: () => number;
  isInQuote: (productId: number) => boolean;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error("useQuote must be used within a QuoteProvider");
  }
  return context;
};

interface QuoteProviderProps {
  children: ReactNode;
}

const QUOTE_STORAGE_KEY = "quote-items";

export const QuoteProvider = ({ children }: QuoteProviderProps) => {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const hasHydratedFromStorage = useRef(false);

  const addToQuote = useCallback((product: Product, quantity: number = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  }, []);

  const removeFromQuote = useCallback((productId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromQuote(productId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromQuote]);

  const clearQuote = useCallback(() => {
    setItems([]);
  }, []);

  useEffect(() => {
    try {
      const storedItems = window.localStorage.getItem(QUOTE_STORAGE_KEY);
      if (storedItems) {
        const parsedItems = JSON.parse(storedItems);
        if (Array.isArray(parsedItems)) {
          setItems(parsedItems);
        }
      }
    } catch {
      // Ignore invalid JSON and keep default state.
    } finally {
      hasHydratedFromStorage.current = true;
    }
  }, []);

  useEffect(() => {
    if (!hasHydratedFromStorage.current) return;

    try {
      window.localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage errors and keep state in memory.
    }
  }, [items]);

  const totalItems = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const itemIds = useMemo(() => {
    return new Set(items.map((item) => item.id));
  }, [items]);

  const getTotalItems = useCallback(() => {
    return totalItems;
  }, [totalItems]);

  const isInQuote = useCallback((productId: number) => {
    return itemIds.has(productId);
  }, [itemIds]);

  const value = useMemo(
    () => ({
      items,
      addToQuote,
      removeFromQuote,
      updateQuantity,
      clearQuote,
      getTotalItems,
      isInQuote,
    }),
    [
      items,
      addToQuote,
      removeFromQuote,
      updateQuantity,
      clearQuote,
      getTotalItems,
      isInQuote,
    ]
  );

  return (
    <QuoteContext.Provider value={value}>
      {children}
    </QuoteContext.Provider>
  );
};
