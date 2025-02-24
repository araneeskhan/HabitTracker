module.exports = {
  plugins: [
    require('tailwindcss'),  // ✅ Correct
    require('autoprefixer'),
    "@tailwindcss/postcss": {},
  ],
};
