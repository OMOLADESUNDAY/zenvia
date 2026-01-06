import { create } from "zustand";

export const useCartStore = create((set) => ({
  // REAL CART DATA
  cartItems: [],

  setCartItems: (items) =>
    set({
      cartItems: items || [],
    }),

  updateItemQuantity: (productId, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.product._id === productId
          ? { ...item, quantity }
          : item
      ),
    })),

  removeItem: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter(
        (item) => item.product._id !== productId
      ),
    })),

  clearCartItems: () =>
    set({
      cartItems: [],
    }),

  // UI COUNTER
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
