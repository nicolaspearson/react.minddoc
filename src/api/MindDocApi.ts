import { execute, getApiEndpoint } from '@utils/ApiUtils';

export class MindDocApi {
	public headers = new Headers({
		Accept: 'application/json',
		'Content-Type': 'application/json'
	});

	public getPatientStatusList = (): Promise<Response> => {
		return execute(this.headers, 'GET', getApiEndpoint(), '/api/v1/status/fixtures/patients');
	};
}
