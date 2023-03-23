const daisyui = require('daisyui');

module.exports = {
  purge: {
    content: ['./**/*.html'],
    safelist: [
      /^bg-/,
      /^text-/,
      /^border-/,
      /^hover\:bg-/,
      /^hover\:text-/,
      /^hover\:border-/,
      /^focus\:bg-/,
      /^focus\:text-/,
      /^focus\:border-/,
    ],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [daisyui],
};
