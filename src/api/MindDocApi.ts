import { execute, getApiEndpoint } from '@utils/ApiUtils';

export class MindDocApi {
	// Should be using "new Headers({})"
	// but it breaks the mount tests.
	public headers: any = {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	};

	public getPatientStatusList = (): Promise<Response> => {
		return execute(this.headers, 'GET', getApiEndpoint(), '/api/v1/status/fixtures/patients');
	};
}
