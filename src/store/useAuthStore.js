import { create } from "zustand";
import { persist } from "zustand/middleware";

// token validation helper
const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp > Date.now() / 1000;
  } catch (err) {
    return false;
  }
};

// -------- Zustand store --------
const useAuthStore = create(
  persist(  // <- THIS is where localStorage is automatically used
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      login: ({ token, user }) => {
        if (!isTokenValid(token)) return;
        set({ token, user, isAuthenticated: true }); 
        // persist middleware automatically stores token + user in localStorage
      },

      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
        // persist middleware automatically removes it from localStorage
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
      name: "auth-storage", // <- THIS is the localStorage key
    }
  )
);

export default useAuthStore;
