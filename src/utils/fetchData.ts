export async function fetchData<T = any>(url: string, config?: RequestInit): Promise<T> {
	// for now going with "res.json()" return type "Promise<any>"
	try {
		const res = await fetch(url, config);
		if (!res.ok) {
			throw new Error('Network response error');
		}
		return await res.json(); //as Promise<T>
	}
	catch (error) {
		throw error;
	}
};
