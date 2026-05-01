import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'surface-elevated': 'hsl(var(--surface-elevated))',
        urgency: 'hsl(var(--urgency))',
        success: 'hsl(var(--success))',
        'brand-orange': 'hsl(var(--brand-orange))',
        'brand-orange-hover': 'hsl(var(--brand-orange-hover))',
        'brand-cyan': 'hsl(var(--brand-cyan))',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
