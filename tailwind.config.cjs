/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],

  darkMode: "class",

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",   // mobile
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },

    extend: {
      colors: {
        primary: {
          DEFAULT: "#4FC38B",
          hover: "#3DAA75",
          light: "#E8F7F0",
          dark: "#2E8B61",
        },

        secondary: "#1F2937", // gray-800
        muted: "#6B7280",     // gray-500
        border: "#E5E7EB",    // gray-200
        background: "#F9FAFB",
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },

      boxShadow: {
        card: "0 4px 12px rgba(0,0,0,0.06)",
        soft: "0 2px 6px rgba(0,0,0,0.04)",
      },

      spacing: {
        section: "4rem",
      },
    },
  },
    extend: {
    backgroundImage: {
      hero: "url('/src/assets/hero-bg.png')",
    },
  },


  plugins: [],
};
