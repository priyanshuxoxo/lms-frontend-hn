// tailwind.config.js
import daisyui from "daisyui";
import lineClamp from "@tailwindcss/line-clamp";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  plugins: [daisyui, lineClamp],
};
