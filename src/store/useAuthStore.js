// store/useAuthStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

// simple token validation: check expiry from JWT
const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp > Date.now() / 1000;
  } catch (err) {
    return false;
  }
};

const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      login: ({ token, user }) => {
        if (!isTokenValid(token)) return;
        set({ token, user, isAuthenticated: true });
      },

      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
      },

      autoLogin: () => {
        const { token, user } = get();
        if (token && isTokenValid(token)) {
          set({ token, user, isAuthenticated: true });
        } else {
          get().logout();
        }
      },
    }),
    {
      name: "auth-storage", // key in localStorage
    }
  )
);

export default useAuthStore;
