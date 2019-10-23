module.exports = {
  env: {
    commonjs: true,
    node: true,
    mocha: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'class-methods-use-this': 'off',
  },
};
