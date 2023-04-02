//import type { InitialOptionsTsJest } from 'ts-jest/dist/types';
//
//const config: InitialOptionsTsJest = {
//	testMatch: ['**/*.test.js', '**/*.test.ts', '**/*.test.tsx'],
//	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//	verbose: true,
//	rootDir: 'test',
//	testEnvironment: 'jest-environment-jsdom',
//};
//
//export default config;

const nextJest = require('next/jest');
const createJestConfig = nextJest();

const customJestConfig = {
	testMatch: ['**/*.test.js', '**/*.test.ts', '**/*.test.tsx'],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	//moduleDirectories: ["node_modules", "<rootDir>/"],
	verbose: true,
	rootDir: 'test',
	testEnvironment: 'jest-environment-jsdom',
	//resetMocks: true,
	modulePathIgnorePatterns: ['cypress'],
};

module.exports = createJestConfig(customJestConfig);
