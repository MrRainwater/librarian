module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  testEnvironment: 'enzyme',
  rootDir: './',
  roots: ['<rootDir>/src/', '<rootDir>/tests/', '<rootDir>'],
  modulePaths: ['<rootDir>/src/', '<rootDir>/tests/'],
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules'
  },
  resetMocks: true
}
