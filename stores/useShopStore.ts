"use client";

import { create } from "zustand";

export type ViewMode = "grid" | "list";

type ShopState = {
  selectedCategory: string | null;
  currentPage: number;
  viewMode: ViewMode;
  isCategoryModalOpen: boolean;
  setSelectedCategory: (selectedCategory: string | null) => void;
  setCurrentPage: (currentPage: number) => void;
  setViewMode: (viewMode: ViewMode) => void;
  setIsCategoryModalOpen: (isCategoryModalOpen: boolean) => void;
};

export const useShopStore = create<ShopState>((set) => ({
  selectedCategory: null,
  currentPage: 1,
  viewMode: "grid",
  isCategoryModalOpen: false,
  setSelectedCategory: (selectedCategory) => {
    set((state) => {
      if (state.selectedCategory === selectedCategory) {
        return state;
      }
      return { selectedCategory };
    });
  },
  setCurrentPage: (currentPage) => {
    const safePage = currentPage < 1 ? 1 : currentPage;
    set((state) => {
      if (state.currentPage === safePage) {
        return state;
      }
      return { currentPage: safePage };
    });
  },
  setViewMode: (viewMode) => {
    set((state) => {
      if (state.viewMode === viewMode) {
        return state;
      }
      return { viewMode };
    });
  },
  setIsCategoryModalOpen: (isCategoryModalOpen) => {
    set((state) => {
      if (state.isCategoryModalOpen === isCategoryModalOpen) {
        return state;
      }
      return { isCategoryModalOpen };
    });
  },
}));
