function resolvePromise(requestFound: boolean, delay: number) {
	const promise = new Promise(resolve => {
		setTimeout(() => {
			if (requestFound) {
				resolve({
					time: Date.now(),
					message: 'RESOLVED - Data Found.',
					status: 200,
				});
			} else {
				resolve({
					message: 'RESOLVED - Data Not Found.',
					status: 404,
				});
			}
		}, delay);
	});
	return promise;
}

// 400 Bad Request Error: the remote computer is unable (or refuses) to process the request sent by the client,
//  due to an issue that is perceived by the server to be a client problem
export default function dateNow(req: {requestFound: boolean, delay: number}): Promise<any> {
	const { requestFound, delay } = req;
	const promise = resolvePromise(requestFound, delay);

	promise
		.then(result => {
			return result;
		})

	return promise;
}
