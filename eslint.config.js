const nextPlugin = require("@next/eslint-plugin-next");

module.exports = [
  {
    ignores: [".next/**", "coverage/**"],
  },
  nextPlugin.flatConfig.coreWebVitals,
];
