/** @type {import('jest').Config} */
module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/cypress/",
  ],
  moduleNameMapper: {
    "^@angular/core/testing$":
      "<rootDir>/node_modules/@angular/core/fesm2022/testing.mjs",
    "^@angular/common/testing$":
      "<rootDir>/node_modules/@angular/common/fesm2022/testing.mjs",
    "^@angular/common/http/testing$":
      "<rootDir>/node_modules/@angular/common/fesm2022/http/testing.mjs",
    "^@angular/router/testing$":
      "<rootDir>/node_modules/@angular/router/fesm2022/testing.mjs",
    "^@angular/platform-browser/testing$":
      "<rootDir>/node_modules/@angular/platform-browser/fesm2022/testing.mjs",
    "^src/(.*)$": "<rootDir>/src/$1",
    "\\.(css|scss|sass)$": "identity-obj-proxy",
  },
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.spec.ts",
    "!src/**/*.d.ts",
    "!src/main.ts",
    "!src/main.server.ts",
    "!src/**/*.module.ts",
    "!src/**/*.routes.ts",
    "!src/**/app.config*.ts",
  ],
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["html", "text", "lcov"],
  // Coverage thresholds set to 50% due to main.component.ts containing complex
  // DOM manipulation, setInterval animations, and resize handlers that are
  // difficult to unit test without extensive mocking. Consider increasing
  // thresholds as more modular patterns are adopted.
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 60,
      lines: 50,
      statements: 50,
    },
  },
  transform: {
    "^.+\\.(ts|mjs|js|html)$": [
      "jest-preset-angular",
      {
        tsconfig: "<rootDir>/tsconfig.spec.json",
        stringifyContentPathRegex: "\\.(html|svg)$",
      },
    ],
  },
  transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$)"],
  moduleFileExtensions: ["ts", "html", "js", "json", "mjs"],
  testMatch: ["**/*.spec.ts", "**/*.test.ts"],
  verbose: true,
};
