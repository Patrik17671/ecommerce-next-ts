import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      black: '#222',
      white: '#FFF',
      primary: '#3964B2',
      gray1: '#F7F7F7',
      alt1: '#242424',
      error: '#D32F2F',
      success: '#4CAF50',
    },
  },
  plugins: [],
};
export default config;
