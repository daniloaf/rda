module.exports = {
  bail: false,
  clearMocks: true,
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  moduleFileExtensions: ["js", "ts", "tsx", "json"],
  testEnvironment: "test",
  testPathIgnorePatterns: ["/node_modules", "/.build"],
  testMatch: ["**/*.test.+(ts|tsx|js)"],
  testTimeout: 15000,
  verbose: true,
  reporters: ["default"],
}
