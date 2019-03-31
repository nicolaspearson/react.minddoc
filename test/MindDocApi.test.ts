import { MindDocApi } from '../src/api/MindDocApi';

// tslint:disable no-string-literal
describe('MindDocApi', () => {
	it('check default headers', (done) => {
		const api: MindDocApi = new MindDocApi();
		expect(api.headers).toBeDefined();
		expect(api.headers['Accept']).toEqual('application/json');
		expect(api.headers['Content-Type']).toEqual('application/json');
		done();
	});

	it('ensure the getPatientStatusList method is defined', () => {
		const api: MindDocApi = new MindDocApi();
		expect(api.getPatientStatusList).toBeDefined();
	});
});
