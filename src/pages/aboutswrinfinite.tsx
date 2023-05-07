import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Loading from '../components/Loading';
import Button from '../components/Button';

import Comment from '../components/Comment/Comment';
import { usePaginationTypicodeComments } from '../hooks/useSWRInfiniteFetchers';

interface AboutSWRInfinitePageProps {
	documentTitle?: string;
};

const AboutSWRInfinite: NextPage<AboutSWRInfinitePageProps> = ({ documentTitle }) => {
	const {
		comments,
		error,
		isLoading,
		isFetchingMore,
		size,
		setSize,
		allDataLoaded,
	} = usePaginationTypicodeComments();

	const [title, setTitle] = useState('');

	useEffect(() => {
		setTitle(documentTitle+':\u0020About\u0020SWR\u0020Two');
	}, [documentTitle]);

	const handleFetchCommentsClick = () => {
		setSize(size + 1)
	};

	return (
		<>
			<Head>
				<title>{ !title ? documentTitle : title }</title>
			</Head>

			<div className="container">
				{/* ---------------------------------------------- */}

				<h1 className="mt-4 mb-3">About SWR</h1>

				{/* ---------------------------------------------- */}

				<div className="bg-color-ivory container-padding-border-radius-1 mb-5">

					{(isLoading || isFetchingMore) && !error && (
						<div className="flex-column align-items-center">
							<div className="text-center">
								<div className="container-padding-radius-10">
									<Loading text="Loading" />
								</div>
							</div>
						</div>
					)}

					{error && (
						<div className="flex-column align-items-center mb-3">
							<div className="text-center">
								<div className="bg-warn-red container-padding-radius-10 text-color-white">
									Error when attempting to fetch resource.
								</div>
							</div>
						</div>
					)}

					{comments && (
						<>
							<div className="container-padding-border-radius-2">
								<div className="comment-grid-container">
									{comments.map((pageIndex: any) => (
										<Comment key={pageIndex.id} index={pageIndex} className="bg-color-cadetblue container-padding-radius-10"/>
									))}
								</div>
							</div>
							<div className={`display-flex align-items-center justify-content-center`}>
								<Button
									disabled={allDataLoaded ? true : false}
									type="button"
									className={`btn-success btn-md mt-2 ${allDataLoaded ? 'disabled' : ''}`}
									onClick={handleFetchCommentsClick}
									buttonText="Fetch Comments"
								/>
							</div>
						</>
					)}

				</div>
			</div>
		</>
	);
};

export default AboutSWRInfinite;
