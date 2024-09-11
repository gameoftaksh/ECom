module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],

    theme: {
      extend: {
        keyframes: {
          'slide-in': {
            '0%': { transform: 'translateX(100%)', opacity: '0' },
            '100%': { transform: 'translateX(0)', opacity: '1' },
          },
        },
        animation: {
          'slide-in': 'slide-in 0.5s ease-out',
          'progress-bar': 'progress-bar 5s linear forwards'
        },
      },
    },
    variants: {},
    plugins: []
  }