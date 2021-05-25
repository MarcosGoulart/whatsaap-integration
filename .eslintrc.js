module.exports = {
  extends: 'standard',
  rules: {
      semi: [2, 'always'],
      indent: [2, 4],
      'no-return-await': 0,
      'no-param-reassign': 1,
      'space-before-function-paren': [2, {
          named: 'never',
          anonymous: 'never',
          asyncArrow: 'always',
      }],
      'template-curly-spacing': [2, 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'jsdoc/check-alignment': 1,
      'jsdoc/check-param-names': 1,
      'jsdoc/check-tag-names': 1,
      'jsdoc/check-types': 1,
      'jsdoc/require-param-name': 1,
      'jsdoc/require-param-type': 1,
      "import/order": [
        "error",
        {
          groups: [
            "index",
            "sibling",
            "parent",
            "internal",
            "external",
            "builtin"
          ]
        }
      ]
  },
  env: {
      commonjs: true,
      node: true,
      mocha: true,
  },
  plugins: [
      'jsdoc',
      "import",
  ],
  settings: {
      jsdoc: {
          mode: 'typescript',
      },
  },
};
