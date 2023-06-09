import type { NextPage, GetServerSideProps } from 'next';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import * as Styles from '../styles';
import { fetchAboutGetSsr, fetchAboutGetSsrError, aboutGetSsrSliceData } from '../redux/slices/aboutGetSsrSlice';
import Loading from '../components/Loading';
import { AboutCSVBPostType } from '../types';
import { wrapper, useAppSelector } from '../redux/store';

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (): Promise<any> => {
	try {
		//using redux here doesn't exactly serve a purpose but it could for other use-cases
		await store.dispatch(fetchAboutGetSsr())
	}
	catch (error) {
		await store.dispatch(fetchAboutGetSsrError())
	}
});

interface AboutSsrPageProps {
	documentTitle: string;
};

const AboutSsr: NextPage<AboutSsrPageProps> = ({ documentTitle,  ...props}) => {
	wrapper.useHydration(props);

	const [title, setTitle] = useState('');
	const aboutGetSsrData = useAppSelector(aboutGetSsrSliceData);

	useEffect(() => {
		setTitle(documentTitle+':\u0020About\u0020SSR');
	}, [documentTitle]);

	return (
		<>
			<Head>
				<title>{ !title ? documentTitle : title }</title>
			</Head>

			<div className="container">
				<h1 className="mt-4 mb-3">About SSR</h1>

				<div className="row-grid grid-six bg-lightskyblue-1 mb-5">
					<div className="col-grid mb-4">
						<Styles.AboutImageMain
							className="img-fluid rounded"
							src={'/about-750-450.png'}
							alt={''}
						/>
					</div>

					<div className="col-grid">
						<h2>About SSR</h2>
						<p>
							<b>This component utilizes &quot;getServerSideProps&quot; for SSR.</b>
						</p>
						<p>
							The below data must be fetched at request time. This could be due to the nature of the data or properties of the request (such as &quot;authorization&quot; headers or geo location).
						</p>

						{aboutGetSsrData.loading && <Loading text="Loading" />}

						{!aboutGetSsrData.loading && (
							<>
								{aboutGetSsrData.error && (
									<p className="bg-warn-red container-padding-radius-10 text-color-white">
										Error when attempting to fetch resource.
									</p>
								)}

								{!aboutGetSsrData.error && (
									<>{aboutGetSsrData?.data?.map((post: AboutCSVBPostType, key: number) => (
										<p data-testid="posts" key={key}>
											{post.body}
										</p>
									))}</>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default AboutSsr;
