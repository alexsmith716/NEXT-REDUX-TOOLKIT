import { AppContext, AppInitialProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { useApollo } from '../apollo/apolloClient';
import { ThemeContext } from '../styled/ThemeContext';
import Layout from '../components/Layout';
import { getUserAgent, getHost } from '../utils/userAgent';
import { setUserAgent } from '../redux/slices/userAgentSlice';
import { wrapper } from '../redux/store';

import '../styled/global-css/fonts.css';
import '../styled/global-css/styles.css';

const App = ({ Component, pageProps }: AppContext & AppInitialProps) => {
	const store = wrapper.useStore();

	const clientApollo = useApollo(pageProps.initialApolloState);
	const dt = pageProps.documentTitle;
	const ua = pageProps.userAgent;

	return (
		<ApolloProvider client={clientApollo}>
			<Provider store={store}>
				<ThemeContext>
					<Layout documentTitle={dt} userAgent={ua}>
						<Component {...pageProps} />
					</Layout>
				</ThemeContext>
			</Provider>
		</ApolloProvider>
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

	const pageProps = {
		...(Component.getInitialProps ? await Component.getInitialProps({ ...ctx }) : {}),
		documentTitle: 'Alex Smith\'s App',
		userAgent: userAgent,
	};

	return {
		pageProps,
	};
});

export default App;
