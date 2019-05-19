module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  rootDir: './',
  roots: ['<rootDir>/src/', '<rootDir>/tests/', '<rootDir>'],
  modulePaths: ['<rootDir>/src/', '<rootDir>/tests/'],
  setupFiles: ['<rootDir>/tests/setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules'
  }
}
