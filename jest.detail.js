module.exports = {
    testEnvironment: "<rootDir>/website/detail/generated/detail.environment.ts",
    setupFilesAfterEnv: ["<rootDir>/website/detail/generated/detail.setup.ts"],
    transform: {
      "^.+\\.[tj]sx?$": [
        "ts-jest",
        {
          isolatedModules: true,
        },
      ],
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    testTimeout: 20000, // 20 seconds
    globalTeardown: '<rootDir>/test-teardown-globals.js',
    coverageReporters: ["lcov", "text-summary"],
    maxWorkers: 1,
  };
