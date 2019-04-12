module.exports = {
  collectCoverageFrom: [
    'app/**/*.{js,jsx}',
    '!app/**/*.test.{js,jsx}',
    '!app/app.js',
  ],
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 91,
      functions: 98,
      lines: 98,
    },
  },
  moduleDirectories: ['node_modules', 'app'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/internals/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/image.js',
  },
  setupTestFrameworkScriptFile: '<rootDir>/internals/test-bundler.js',
  setupFiles: ['raf/polyfill', '<rootDir>/internals/enzyme-setup.js'],
  testRegex: 'tests/.*\\.test\\.js$',
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
