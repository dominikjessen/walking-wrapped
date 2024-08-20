import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        foreground: '#141414',
        background: '#FDFFFC',
        'light-green': '#2EC4B6'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      keyframes: {
        wave: {
          '0%, 75%, 100%': { transform: 'rotate(0deg)' },
          '12.5%': { transform: 'rotate(16deg)' },
          '25%': { transform: 'rotate(-10deg)' },
          '37.5%': { transform: 'rotate(16deg)' },
          '50%': { transform: 'rotate(-10deg)' },
          '62.5%': { transform: 'rotate(16deg)' }
        }
      },
      animation: {
        wave: 'wave 2s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
export default config;
