import type { Config } from 'tailwindcss';
const svgToDataUri = require("mini-svg-data-uri");
const colors = require("tailwindcss/colors");
const {
 default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

function addVariablesForColors({ addBase, theme }: any) {
 let allColors = flattenColorPalette(theme("colors"));
 let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
 );
 addBase({
    ":root": newVars,
 });
}

export default {
 darkMode: ["class"],
 content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx,mdx}'
 ],
 prefix: "",
 theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        // Combine colors from both configurations
        tremor: {
          brand: {
            faint: '#eff6ff', // blue-50
            muted: '#bfdbfe', // blue-200
            subtle: '#7fb7fb', // blue-400
            DEFAULT: '#3b82f6', // blue-500
            emphasis: '#1d4ed8', // blue-700
            inverted: '#ffffff' // white
          },
          background: {
            muted: '#f9efafb', // gray-50
            subtle: '#eff6ff', // gray-100
            DEFAULT: 'transparent', // white
            emphasis: '#eff6ff' // gray-700
          },
          border: {
            DEFAULT: '#e5e7eb' // gray-200
          },
          ring: {
            DEFAULT: '#e5e7eb' // gray-200
          },
          content: {
            subtle: '#fff', // gray-400
            DEFAULT: '#fff', // gray-500
            emphasis: '#fff', // gray-700
            strong: '#fff', // gray-900
            inverted: '#ffffff' // white
          }
        }
      },
      boxShadow: {
        'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'tremor-card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'tremor-dropdown': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
      },
      borderRadius: {
        'tremor-small': '0.375rem',
        'tremor-default': '0.5rem',
        'tremor-full': '9999px'
      },
      fontSize: {
        'tremor-label': '0.75rem',
        'tremor-default': ['0.875rem', { lineHeight: '1.25rem' }],
        'tremor-title': ['1.125rem', { lineHeight: '1.75rem' }],
        'tremor-metric': ['1.875rem', { lineHeight: '2.25rem' }]
      }
    }
 },
 plugins: [
    require('@headlessui/tailwindcss'),
    require("tailwindcss-animate"),
    addVariablesForColors,
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-grid": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    }
 ],
 safelist: [
    // Safelist patterns from both configurations
    // Ensure there are no duplicates and merge as necessary
 ]
} as Config;
