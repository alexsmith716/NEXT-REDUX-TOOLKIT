import useSWR from 'swr';
import { fetchData } from '../utils/fetchData';

// per_page integer
// The number of results per page (max 100)
// Default: 30
// ===================
// page integer
// Page number of the results to fetch
// Default: 1

// https://api.github.com/gists/public?per_page=10 | ?page=1

export const useGithubGists = () => {
	const apiEndPoint = 'https://api.github.com/gists/public';

	const { data, error, isLoading, } = useSWR(
		`${apiEndPoint}?per_page=10`,
		fetchData,
		{
			refreshInterval: 60000,
		}
	);

	return {
		data,
		error,
		isLoading,
		//isValidating,
	};
};
