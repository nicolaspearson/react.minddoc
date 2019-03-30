// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
	// Automatically clear mock calls and instances between every test
	clearMocks: true,

	// An array of glob patterns indicating a set of files for which coverage information should be collected
	collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],

	// The directory where Jest should output its coverage files
	coverageDirectory: 'coverage',

	// A list of reporter names that Jest uses when writing coverage reports
	coverageReporters: ['json-summary', 'text', 'lcov'],

	// An array of regexp pattern strings, if the path matches any of the patterns, coverage information will be skipped.
	coveragePathIgnorePatterns: ['/node_modules/'],

	// A set of global variables that need to be available in all test environments
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.jest.json'
		}
	},

	// An array of file extensions your modules use
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

	// Map aliases
	moduleNameMapper: {
		'^@assets(.*)$': '<rootDir>/src/assets$1',
		'^@components(.*)$': '<rootDir>/src/components$1',
		'^@containers(.*)$': '<rootDir>/src/containers$1',
		'^@enums(.*)$': '<rootDir>/src/enums$1',
		'^@logger(.*)$': '<rootDir>/src/logger$1',
		'^@models(.*)$': '<rootDir>/src/models$1',
		'^@router(.*)$': '<rootDir>/src/router$1',
		'^@store(.*)$': '<rootDir>/src/store$1',
		'^@styles(.*)$': '<rootDir>/src/styles$1',
		'^@utils(.*)$': '<rootDir>/src/utils$1'
	},

	// The root directories
	roots: ['<rootDir>/src', '<rootDir>/test'],

	// The testing env preset
	preset: 'ts-jest',

	// A list of paths to snapshot serializer modules Jest should use for snapshot testing
	snapshotSerializers: ['enzyme-to-json/serializer'],

	// The environment that will be used for testing
	testEnvironment: 'jsdom',

	// The glob patterns Jest uses to detect test files
	testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],

	// An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
	testPathIgnorePatterns: ['\\\\node_modules\\\\'],

	// An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
	transformIgnorePatterns: ['<rootDir>/node_modules/'],

	// A map from regular expressions to paths to transformers
	transform: {
		'\\.(ts|tsx)$': 'ts-jest',
		'^.+\\.(css|scss|svg)$': '<rootDir>test/styleMock.js'
	},

	// Indicates whether each individual test should be reported during the run
	verbose: false
};
