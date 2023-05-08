import React from 'react';
import { ThemeProvider } from 'styled-components';
import NavBar from '../../src/components/NavBar/NavBar';
import { NavLinks } from '../../src/components/NavBar/NavLinks';
import { render, screen } from '@testing-library/react';

jest.mock('next/router', () => ({
	useRouter() {
		return ({
			route: '/',
			pathname: '/',
			query: {},
			asPath: '/',
			isFallback: false,
			basePath: '',
			locale: undefined,
			locales: undefined,
			defaultLocale: undefined,
			isReady: true,
			domainLocales: undefined,
			isPreview: false,
			isLocaleDomain: false
		});
	},
}));

describe('Navbar Component', () => {
	it('should render all NavBarNav container Links', async () => {

		const themeModeMode = {
			app: {
				textColor: '#212529',
				backgroundColor: '#f8f9fa',
				navBarColor: '#343a40',
				spinnerColor: '#fff',
				rutgersScarlet: '#ee363d'
			},
			modal: { overflow: '' }
		};

		render(
			<ThemeProvider theme={themeModeMode}>
				<NavBar />
			</ThemeProvider>
		);

		expect(await screen.findByText('Dark')).toBeInTheDocument();

		for(let i = 0; i < NavLinks.length; i++) {
			expect(await screen.findByText(`${NavLinks[i].title}`)).toBeInTheDocument();
		}
	});
});
