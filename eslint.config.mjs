import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";

export default [
  // Build output, Astro-generated types, and the design-review mockups
  // (React/Babel harness, not part of the built site) aren't ours to lint.
  {
    ignores: ["dist/", ".astro/", "public/designs/"],
  },

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
