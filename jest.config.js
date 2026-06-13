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
    "!src/app/app.routes.server.ts",
    "!src/app/main/**",
    "!src/app/data/portfolio.interfaces.ts",
    "!src/**/*.module.ts",
    "!src/**/*.routes.ts",
    "!src/**/app.config*.ts",
  ],
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["html", "text", "text-summary", "json-summary", "lcov"],
  coverageProvider: "v8",
  // The deprecated legacy main component is excluded from collection so the
  // gate reflects the current SSG portfolio surface and reusable handlers.
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
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
