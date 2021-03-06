module.exports = {
  preset: "ts-jest",
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testEnvironment: 'jsdom',
  testRegex: '/tests/.*\\.test?\\.ts$',
  moduleFileExtensions: ['ts', 'js'],
  "transform": {
    "node_modules/reactive-props/.+\\.(j|t)sx?$": "ts-jest"
  },
  transformIgnorePatterns: [
    // allow lit-html transformation
    "node_modules/(?!reactive-props/.*)",
  ],
  globals: {
    "ts-jest": {
      tsconfig: {
        // allow js in typescript
        allowJs: true,
      },
    },
  },
};
