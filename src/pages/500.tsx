import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

interface ServerErrorProps {
	documentTitle: string;
};

const StyledHeadingOne = styled.h1`
	color: #000;
`;

const ServerError: NextPage<ServerErrorProps> = ({documentTitle}) => {
	const [title, setTitle] = useState('');

	useEffect(() => {
		setTitle(documentTitle+':\u0020Status Code 500');
	}, [documentTitle]);

	return (
		<>
			<Head>
				<title>{ !title ? documentTitle : title }</title>
			</Head>

			<div className="container">
				<StyledHeadingOne className="mt-4 mb-3">Status Code 500!</StyledHeadingOne>
				<div>
					<div>
						<p>500 - Server-side error occurred.</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default ServerError;
