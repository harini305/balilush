import nextVitals from 'eslint-config-next/core-web-vitals';

const config = [
  ...nextVitals,
  { ignores: ['.next/**', 'node_modules/**', 'docs/**', 'assets-source/**', 'public/**'] },
];

export default config;
