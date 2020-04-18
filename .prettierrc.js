console.log('⚙️Using Prettier config from `./prettierrc.js`');

module.exports = {
  parser: 'typescript',
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 120,
  overrides: [
    {
      files: ['.*', '*.json'],
      options: { parser: 'json' },
    },
    {
      files: ['*.js'],
      options: { parser: 'typescript' },
    },
  ],
};
