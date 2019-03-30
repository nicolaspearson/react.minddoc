/**
 * This function retrieves the environments API Endpoint,
 * if using the dev environment we will use the dev server
 * to redirect requests in order to avoid CORS issues.
 */
export function getApiEndpoint(): string {
	return process.env.REACT_APP_API_ENDPOINT || '';
}

/**
 * This function provides a wrapper around the Fetch API.
 *
 * @param headers Additional headers to be sent with the request
 * @param method The REST method, i.e. GET, POST, PUT, etc
 * @param url The request URL
 * @param path The request path
 * @param data The data to be passed for POST / PUT
 */
export async function execute(
	headers: Headers,
	method: string,
	url: string,
	path: string,
	data?: any
): Promise<Response> {
	let resStatus: number = 0;
	const reqUrl: string = url + path;
	return fetch(reqUrl, {
		cache: 'default',
		method,
		headers,
		// mode: 'no-cors',
		body: JSON.stringify(data)
	})
		.then((res) => {
			// Set the status code from the response
			resStatus = res.status;

			if (resStatus === 204 || resStatus === 500) {
				return '{}';
			}

			return res.json();
		})
		.then((res) => {
			switch (resStatus) {
				case 500:
					throw Error('500 Internal Server Error: Please try again!');
			}
			return res;
		})
		.catch((error) => {
			if (error instanceof Error) {
				return Promise.reject(error.message);
			}
			return Promise.reject(error);
		});
}
