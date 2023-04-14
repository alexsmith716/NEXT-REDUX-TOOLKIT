import React, { ReactNode } from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import NavBar from '../NavBar/NavBar';
import OpenWeatherMap from '../OpenWeatherMap/OpenWeatherMap';
import UserAgent from '../UserAgent/UserAgent';
import TimeZone from '../TimeZone/TimeZone';
import Footer from '../Footer/Footer';
import DatePicker from '../DatePicker/DatePicker';

import { useReactContext } from '../../styled/ThemeContext';
import { AppTheme } from '../../styled';
import { Global } from '../../styled';

type Props = {
	children?: ReactNode
	title?: string
}

export const Layout = ({ children, title = 'Alex Smith\'s App' }: Props) => {
	const themeMode = useReactContext();
	const themeModeKey = `${themeMode.mode}` as string;
	const themeModeModalKey = `${themeMode.modalMode}` as string;
	const themeModeMode = {
		app: AppTheme.theme[themeModeKey as keyof typeof AppTheme.theme],
		modal: AppTheme.theme[themeModeModalKey as keyof typeof AppTheme.theme],
	};

	return (
		<ThemeProvider theme={themeModeMode}>
			<Global.GlobalStyle />
			<Head>
				<link rel="icon" href="/favicon.ico" type="image/x-icon" />
				<meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="application-name" content="Alex Smith's App" />
				<meta name="author" content="AlexSmith716" />
				<meta property="og:locale" content="en_US" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="Alex Smith's App" />
				<meta property="og:description" content="Alex Smith's App" />
				<title>{title}</title>
			</Head>

			<NavBar />

			{children}

			<DatePicker />

			<TimeZone />

			<OpenWeatherMap />

			<UserAgent />

			<Footer />
		</ThemeProvider>
	)
};
