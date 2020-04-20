module.exports = {
  extends: ['../.eslintrc.js', 'plugin:react/recommended'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 0
  }
}
