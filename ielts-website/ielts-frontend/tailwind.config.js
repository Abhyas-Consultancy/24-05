/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brandRed: "#8F0E0E",
        brandCream: "#F7F6DE"
      },
    },
  },
  plugins: [],
}



// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     './src/**/*.{js,jsx,ts,tsx}',
//   ],
//   theme: {
//     extend: {
//       colors: {
//         brandRed: '#FF4B4B',
//         brandCream: '#FFF7F0',
//       },
//     },
//   },
//   plugins: [],
// }