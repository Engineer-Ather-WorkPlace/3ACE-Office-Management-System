/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navbar: '#003366', // Navbar color (dark blue)
        footer: '#003366', // Footer color (same as navbar for consistency)
        heading: '#1E3A8A', // Dark Blue for headings
        subheading: '#4B5563', // Gray for subheadings
        text: '#333333', // Text color
        // background: '#F9FAFB', // Background color
        accent: '#60A5FA', // Light blue accent color for buttons and links
        globalBackground: "bg-gradient-to-r from-gray-900 to-blue-900"
        // globalBackground2: ""
      },
      fontSize: {
        heading: '2.25rem', // Heading size (36px)
        subheading: '1.25rem', // Subheading size (20px)
        body: '1rem', // Body text size (16px)
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Default sans-serif font
        serif: ['Merriweather', 'serif'], // Custom serif font for headings
      },
    },
  },
  plugins: [],
};

