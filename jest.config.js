module.exports = {
  collectCoverage: true,
  coverageReporters: ['lcov', 'text', 'html'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!axios)/'],
  preset: 'ts-jest',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^axios$': 'axios/dist/node/axios.cjs',
  },
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.js'],
};
