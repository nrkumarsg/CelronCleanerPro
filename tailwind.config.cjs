/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tech: ['Orbitron', 'sans-serif'],
      },
      colors: {
        background: "#080810",
        surface: "#12121e",
        primary: {
          light: "#a855f7",
          DEFAULT: "#8b5cf6",
          dark: "#7c3aed",
        },
        accent: {
          light: "#22d3ee",
          DEFAULT: "#06b6d4",
          dark: "#0891b2",
        }
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        'conic-gradient': 'conic-gradient(from 0deg, #a855f7, #22d3ee, #a855f7)',
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(168, 85, 247, 0.4)',
        'glow-accent': '0 0 20px rgba(34, 211, 238, 0.4)',
        'glow-white': '0 0 15px rgba(255, 255, 255, 0.1)',
      }
    },
  },
  plugins: [],
}
