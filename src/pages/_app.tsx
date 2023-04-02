import { AppContext, AppInitialProps } from 'next/app';
//import Error from 'next/error';
import { Provider } from 'react-redux';
import { ThemeContext } from '../styled/ThemeContext';
import { Layout } from '../components/Layout';
import { LatLonType } from '../types';

import { wrapper } from '../redux/store';
import { getAddress, fetchOpenWeatherMapError, fetchOpenWeatherMap } from '../components/OpenWeatherMap/openWeatherMapSlice';

import '../styled/fonts.css';

const App = ({ Component, ...initialProps }: AppContext & AppInitialProps) => {
	const {store, props} = wrapper.useWrappedStore(initialProps);

	return (
		<Provider store={store}>
			<ThemeContext>
				<Layout>
					<Component {...props.pageProps} />
				</Layout>
			</ThemeContext>
		</Provider>
	);
};

App.getInitialProps = wrapper.getInitialAppProps((store) => async ({ Component, ctx }) => {
	const isServer = typeof window === 'undefined' && !ctx.req?.url?.startsWith('/_next/data');

	if (isServer) {
		const startingGeo:string = 'New York, NY, US';

		const latLon = await getAddress(startingGeo)
			.then((response) => {
				return response;
			})
			.catch( async () => {
				await store.dispatch(fetchOpenWeatherMapError());
				return null;
			});
		if(latLon) {
			await store.dispatch(fetchOpenWeatherMap((latLon as unknown) as LatLonType))
		}

	}

	const pageProps = {
		...(Component.getInitialProps ? await Component.getInitialProps({...ctx,store,}) : {}),
		documentTitle: 'Alex Smith\'s App',
	};

	return {
		pageProps,
	};
});

export default App;
