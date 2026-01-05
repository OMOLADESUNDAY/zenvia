import { create } from "zustand";

export const useCartStore = create((set) => ({
  cartCount: 0,

  incrementCart: () =>
    set((state) => ({
      cartCount: state.cartCount + 1,
    })),

  removeCart: () =>
    set((state) => ({
      cartCount: Math.max(state.cartCount - 1, 0),
    })),

  removeAllCart: () =>
    set({
      cartCount: 0,
    }),

  setCartCount: (count) =>
    set({
      cartCount: Math.max(count, 0),
    }),
}));
