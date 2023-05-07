import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Loading from '../components/Loading';

import Gist from '../components/Gist/Gist';
import { useGithubGists } from '../hooks/useSWRFetchers';

interface SwrGithubGistsProps {
	documentTitle?: string;
};

const SwrGithubGists: NextPage<SwrGithubGistsProps> = ({ documentTitle }) => {
	const [title, setTitle] = useState('');

	const {
		data,
		error,
		isLoading,
		//isValidating,
	} = useGithubGists();

	useEffect(() => {
		setTitle(documentTitle+':\u0020SWR\u0020Github\u0020Gists');
	}, [documentTitle]);

	return (
		<>
			<Head>
				<title>{ !title ? documentTitle : title }</title>
			</Head>

			<div className="container">
				{/* ---------------------------------------------- */}

				<h1 className="mt-4 mb-3">SWR Github Gists</h1>

				<div className="mb-3">
					<p>
						The 10 most recent gists from the Github REST API endpoint `<code>/gists/public</code>` are listed below. SWR Automatic Revalidation occurs on Interval every minute.
					</p>
				</div>

				<div className="word-break-all container-padding-border-radius-1 bg-color-ivory mb-5">

					{isLoading && !error && (
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

					{data && (
						<>
							<div>
								<div className="comment-grid-container-gist">
									{Object.entries(data).map(([key, value]) => (
										<Gist key={key} index={value} className="bg-color-cadetblue container-padding-4-radius-6"/>
									))}
								</div>
							</div>
						</>
					)}

				</div>
			</div>
		</>
	);
};

export default SwrGithubGists;
