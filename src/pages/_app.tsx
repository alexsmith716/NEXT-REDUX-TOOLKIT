import { AppContext, AppInitialProps } from 'next/app';
//import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
//import { useApollo } from '../apollo/apolloClient';
import { ThemeContext } from '../styled/ThemeContext';
import Layout from '../components/Layout';
import { getUserAgent, getHost } from '../utils/userAgent';
import { setUserAgent } from '../redux/slices/userAgentSlice';
import { wrapper } from '../redux/store';

import '../styled/global-css/fonts.css';
import '../styled/global-css/styles.css';

const App = ({ Component, ...initialProps }: AppContext & AppInitialProps) => {
	const {store, props} = wrapper.useWrappedStore(initialProps);
	//const clientApollo = useApollo(props.pageProps.initialApolloState);
	const dt = initialProps.pageProps.documentTitle;
	const ua = initialProps.pageProps.userAgent;

	return (
		//<ApolloProvider client={clientApollo}>
			<Provider store={store}>
				<ThemeContext>
					<Layout documentTitle={dt} userAgent={ua}>
						<Component {...props.pageProps} />
					</Layout>
				</ThemeContext>
			</Provider>
		//</ApolloProvider>
	);
};

App.getInitialProps = wrapper.getInitialAppProps((store) => async ({ Component, ctx }) => {
	const isServer = typeof window === 'undefined' && !ctx.req?.url?.startsWith('/_next/data');

	let userAgent;

	if (isServer) {
		userAgent = {
			userAgent: getUserAgent(ctx?.req?.headers['user-agent']!),
			host: getHost(ctx?.req?.headers['host']!),
		};
		await store.dispatch(setUserAgent(getUserAgent(ctx?.req?.headers['user-agent']!), getHost(ctx?.req?.headers['host']!)));
	}

	// this will be removed. will use client-side data fetching with `OpenWeatherMap`
	// *** should begin process migrating next.js 13 from pages to app ***
	//if (isServer) {
	//	const startingGeo:string = '    nEw    yorK,    nY    ,      uS     ';
	//	//const startingGeo:string = 'New York,NY,'; //fails -for state, country code is required

	//	const latLon = await getAddress(startingGeo)
	//		.then((response) => {
	//			return response;
	//		})
	//		.catch( async () => {
	//			await store.dispatch(fetchOpenWeatherMapError());
	//			return null;
	//		});
	//	if(latLon) {
	//		await store.dispatch(fetchOpenWeatherMap((latLon as unknown) as LatLonType));
	//	}
	//}

	const pageProps = {
		...(Component.getInitialProps ? await Component.getInitialProps({...ctx,store,}) : {}),
		documentTitle: 'Alex Smith\'s App',
		userAgent: userAgent,
	};

	return {
		pageProps,
	};
});

export default App;
