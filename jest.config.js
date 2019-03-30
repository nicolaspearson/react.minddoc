module.exports = {
	preset: 'ts-jest',
	roots: ['<rootDir>/src', '<rootDir>/test'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
	transform: {
		'\\.(ts|tsx)$': 'ts-jest',
		'^.+\\.(css|scss)$': '<rootDir>test/styleMock.js'
	},
	coverageReporters: ['json-summary', 'text', 'lcov'],
	coveragePathIgnorePatterns: ['/node_modules/'],
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.jest.json'
		}
	},
	setupTestFrameworkScriptFile: '<rootDir>test/setupTests.ts',
	snapshotSerializers: ['enzyme-to-json/serializer']
};
