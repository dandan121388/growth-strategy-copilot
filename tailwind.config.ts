import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172033",
        navy: "#17324d",
        teal: "#16877d",
        canvas: "#f4f6f8",
        line: "#e4e9ef",
      },
      boxShadow: { card: "0 1px 2px rgba(16,24,40,.04), 0 6px 18px rgba(16,24,40,.035)" },
      fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
} satisfies Config;
