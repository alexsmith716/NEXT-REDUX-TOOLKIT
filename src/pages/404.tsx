import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

interface NotFoundProps {
	documentTitle: string;
};

const StyledHeadingOne = styled.h1`
	color: #000;
`;

const NotFound: NextPage<NotFoundProps> = ({documentTitle}) => {
	const [title, setTitle] = useState('');

	useEffect(() => {
		setTitle(documentTitle+':\u0020Status Code 404');
	}, [documentTitle]);

	return (
		<>
			<Head>
				<title>{ !title ? documentTitle : title }</title>
			</Head>

			<div className="container">
				<StyledHeadingOne className="mt-4 mb-3">Status Code 404!</StyledHeadingOne>
				<div>
					<div>
						<p>Page Not Found.</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default NotFound;
