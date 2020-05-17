module.exports = {
  extends: ['../.eslintrc.js', 'plugin:react/recommended'],
  parserOptions: {
    project: ['./tsconfig.json']
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 0,
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true
      }
    ]
  }
}
