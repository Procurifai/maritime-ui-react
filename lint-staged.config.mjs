export default {
  '**/*.{ts,tsx,js,mjs,cjs}': ['eslint --fix', 'prettier --write'],
  '**/*.{json,md,mdx,yml,yaml,css}': ['prettier --write'],
};
