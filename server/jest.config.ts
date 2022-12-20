import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/', //
    '<rootDir>/build/',
  ],
  moduleNameMapper: {
    '^src/(.*)$': ['<rootDir>/src/$1'],
  },
  coveragePathIgnorePatterns: ['<rootDir>/src/mocks/'],
  coverageThreshold: {
    global: {},
    './src/domain/**': {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
}
export default config
