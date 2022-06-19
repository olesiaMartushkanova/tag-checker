module.exports = {
  maxWorkers: 4,
  maxConcurrency: 3,
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: ['default'],
  errorOnDeprecated: true,
  roots: ['<rootDir>/test'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
