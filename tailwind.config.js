/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cozy': {
          'cream': '#FDF8F3',
          'sand': '#F5E6D3',
          'sage': '#A8B5A0',
          'sageDark': '#7A8A72',
          'sageLight': '#D4DDD0',
          'clay': '#D4A574',
          'deep': '#3D3D3D',
          'charcoal': '#2A2A2A',
        },
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'float': '0 8px 24px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      fontFamily: {
        'sans': ['Nunito', 'sans-serif'],
        'serif': ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
}
