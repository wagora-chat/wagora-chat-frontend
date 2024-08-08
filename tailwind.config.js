/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'noto-sans-kr': ['Noto Sans KR', 'sans-serif'],
      },
      colors: {
        snow: '#FFFFFF',
        lavender: '#B093E1',
        charcoal: '#7C7C7C',
        mint: '#55D7B9',
        onyx: '#000000',
        ice: '#F5FAFF',
        silver: '#aaaaaa',
        bubblegum: '#ff88b8',
        peach: '#ffbb5a',
        sunny: '#fff54d',
        teal: '#55d8b9',
        sky: '#7bc8ff',
        periwinkle: '#d8c9f0',
      }
    }
  },
  plugins: [],
}

