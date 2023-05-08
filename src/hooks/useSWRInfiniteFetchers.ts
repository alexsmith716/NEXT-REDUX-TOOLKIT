import useSWRInfinite from 'swr/infinite';
import { fetchData } from '../utils/fetchData';

export const usePaginationTypicodeComments = () => {
	const apiEndPoint = 'https://jsonplaceholder.typicode.com/comments';

	//isValidating
	const { data, error, isLoading, size, setSize } = useSWRInfinite(
		(index: number,) => { return `${apiEndPoint}?_page=${index + 1}&_limit=40` },
		fetchData,
		{
			shouldRetryOnError: true, //retry when fetcher has an error
			revalidateIfStale: false, //automatically revalidate even if there is stale data
			revalidateOnFocus: false, //automatically revalidate when window gets focused
			revalidateOnReconnect: false, //automatically revalidate when the browser regains a network connection (via navigator.onLine)
			//refreshInterval: 40000, //automatically refetch data
			revalidateAll: false, //always try to revalidate all pages
			persistSize: true,
		}
	);

	const comments = data ? data.flat(1) : [];

	const isFetchingMore = (!data && !error) || (size > 0 && data && typeof data[size - 1] === 'undefined');

	const allDataLoaded = (data && data[data.length - 1]?.length < 40);

	return {
		comments,
		error,
		isLoading,
		isFetchingMore,
		size,
		setSize,
		allDataLoaded,
	};
};
