/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./component/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    minHeight: {
      '24': '24rem',
    },
    extend: {
      screens: {
        '3xl': '1792px'
      }
    },
  },
  plugins: [],
  safelist: [
    'rounded-md',
    'rounded-lg',
    'px-2',
    'px-4',
    'bg-gray-900',
    'bg-gray-700',
    'bg-gray-400',
    'bg-gray-300',
    'text-gray-100',
    'text-gray-200',
    'text-gray-400',
    'text-gray-800',
    'text-green-400',
    'text-yellow-400',
    'pt-2',
    'pt-4',
    'font-semibold',
    'text-xs',
    'capitalize',
    'relative',
    'float-right',
    'absolute',
    'top-0',
    'top-5',
    'right-0',
    'border-l-8',
    'border-gray-800',
    'my-1',
    'mt-2',
    'pl-4',
    'pl-8',
    'pr-3',
    'py-1',
    'block',
    'h-16',
    'z-10',
  ],
}
