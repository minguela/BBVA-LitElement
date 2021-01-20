module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    'no-debugger': ['off'],
    'no-console': ['off'],
    'class-methods-use-this': ['off'],
    'import/prefer-default-export': ['off'],
  },
}
