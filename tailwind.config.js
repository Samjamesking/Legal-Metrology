/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gov: {
          blue: '#0F4C81',
          blueLight: '#1B6CA8',
          blueDark: '#0A3357',
          navy: '#0B2545',
          gold: '#D4AF37',
          accent: '#E0F2FE'
        },
        compliance: {
          green: '#10B981',
          greenLight: '#D1FAE5',
          greenDark: '#047857'
        },
        violation: {
          red: '#EF4444',
          redLight: '#FEE2E2',
          redDark: '#B91C1C'
        },
        warning: {
          amber: '#F59E0B',
          amberLight: '#FEF3C7',
          amberDark: '#B45309'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      borderRadius: {
        'gov': '12px',
        'gov-lg': '16px',
        'gov-xl': '20px'
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'card': '0 4px 20px -2px rgba(15, 76, 129, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 12px 30px -4px rgba(15, 76, 129, 0.15), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
        'glow-green': '0 0 20px rgba(16, 185, 129, 0.35)',
        'glow-blue': '0 0 20px rgba(15, 76, 129, 0.35)'
      },
      animation: {
        'scan-line': 'scan 2.5s ease-in-out infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'laser': 'laser 1.8s ease-in-out infinite alternate'
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(100%)' }
        },
        laser: {
          '0%': { top: '0%' },
          '100%': { top: '96%' }
        }
      }
    },
  },
  plugins: [],
}
