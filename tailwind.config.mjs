/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Outfit", "system-ui", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      colors: {
        // Custom colors to match original design
        "bg-primary": "#0a0a0a",
        "bg-secondary": "#111111",
        "bg-tertiary": "#1a1a1a",
        "bg-card": "#141414",
        "text-primary": "#ffffff",
        "text-secondary": "#a0a0a0",
        "text-muted": "#5a5a5a",
        "accent-primary": "#ff3c00",
        "accent-secondary": "#ff6b35",
        "accent-tertiary": "#ffa500",
        "accent-success": "#4caf50",
        "accent-warning": "#ff9800",
      },
      backgroundImage: {
        "gradient-accent": "linear-gradient(135deg, #ff3c00 0%, #ff6b35 100%)",
        "gradient-accent-full":
          "linear-gradient(135deg, #ff3c00, #ff6b35, #ffa500)",
        "gradient-danger": "linear-gradient(135deg, #ff3366 0%, #ff0044 100%)",
        "gradient-success": "linear-gradient(135deg, #4caf50 0%, #45a049 100%)",
      },
      boxShadow: {
        glow: "0 20px 60px rgba(255, 60, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
        "glow-sm": "0 10px 30px rgba(255, 60, 0, 0.3)",
        "glow-hover": "0 0 50px rgba(255, 60, 0, 0.5)",
        "glow-intense":
          "0 25px 70px rgba(255, 60, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease forwards",
        "fade-in-delay-1": "fadeIn 0.6s ease 0.2s backwards",
        "fade-in-delay-2": "fadeIn 0.6s ease 0.4s backwards",
        "pulse-slow": "pulse 2s ease-in-out infinite",
        "scale-in": "scaleIn 0.3s ease forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        carlogoquiz: {
          primary: "#ff3c00",
          "primary-content": "#ffffff",
          secondary: "#ff6b35",
          "secondary-content": "#ffffff",
          accent: "#ffa500",
          "accent-content": "#0a0a0a",
          neutral: "#1a1a1a",
          "neutral-content": "#a0a0a0",
          "base-100": "#0a0a0a",
          "base-200": "#111111",
          "base-300": "#1a1a1a",
          "base-content": "#ffffff",
          info: "#00d4ff",
          "info-content": "#0a0a0a",
          success: "#4caf50",
          "success-content": "#ffffff",
          warning: "#ff9800",
          "warning-content": "#0a0a0a",
          error: "#ff3366",
          "error-content": "#ffffff",
          "--rounded-box": "1rem",
          "--rounded-btn": "0.625rem",
          "--rounded-badge": "9999px",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.98",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        },
      },
    ],
    darkTheme: "carlogoquiz",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: false,
  },
};
