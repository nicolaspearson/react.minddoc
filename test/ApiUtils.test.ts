import { execute, getApiEndpoint } from '../src/utils/ApiUtils';

describe('ApiUtils', () => {
	it('get the api endpoint', (done) => {
		expect(getApiEndpoint).toBeDefined();
		expect(getApiEndpoint()).toEqual('');
		done();
	});

	it('ensure the execute method is defined', () => {
		expect(execute).toBeDefined();
	});
});
