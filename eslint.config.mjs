import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...nextVitals,
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      "scratch/**",
      "private_upload/**",
    ],
  },
];
export default config;
