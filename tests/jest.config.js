module.exports = {
    testEnvironment: "node",
    testMatch: ["**/tests/express/**/*.test.js"],
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/app/$1",
    },
    testTimeout: 30000,
};