import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ["**/*.{ts,tsx}"],
  })),
  ...astro.configs.recommended,

  {
    files: ["**/*.{ts,tsx,astro}"],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Let Prettier own formatting concerns
  {
    rules: {
      "astro/no-set-html-directive": "error",
    },
  },
];
