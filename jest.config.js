const config = {
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
  setupFilesAfterEnv: ['tests/setupTests.js'],
};

export default config;
