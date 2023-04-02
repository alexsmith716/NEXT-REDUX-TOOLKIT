export function fetchData<T = any>(url: string, config?: any): Promise<T> {
	return fetch('/'+url+`${config?'/'+config:''}`, {
		method: 'GET',
	})
	.then(res => {
		if (!res.ok) {
			throw res;
		}
		if(res.headers.get('content-type')?.includes('application/json')) {
			return res.json()
		} else if(res.headers.get('content-type')?.includes('text/csv')) {
			return res.text()
		} else {
			return res
		}
	})
	.catch(() => {
		return Promise.reject({ error: 'Error when attempting to fetch resource.' });
	});
};
