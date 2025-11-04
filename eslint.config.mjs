import js from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        document: "readonly",
        window: "readonly",
        localStorage: "writable",
      },
    },
    plugins: {
      js,
    },
    rules: {
      ...js.configs.recommended.rules,
      semi: ["error", "always"],
      quotes: ["error", "single"],
    },
  },
  {
    ignores: ["config/dist/"],
  },
  {
    files: ["**/webpack.config.js", "**/eslint.config.js"],
    languageOptions: {
      parserOptions: {
        sourceType: "script",
      },
      globals: {
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
    rules: {
      "import/no-commonjs": "off",
      quotes: ["error", "single"],
    },
  },
];
