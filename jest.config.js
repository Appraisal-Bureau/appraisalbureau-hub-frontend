const esModules = ['axios', '@testing-library/jest-dom'].join('|');

module.exports = {
  collectCoverage: true,
  coverageReporters: ['lcov', 'text', 'html'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  transformIgnorePatterns: [`node_modules/(?!${esModules})`],
  preset: 'ts-jest',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^axios$': 'axios/dist/node/axios.cjs',
  },
  rootDir: './',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.js'],
};
