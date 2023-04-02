import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Home from '../components/Home/Home';

interface IndexPageProps {
	documentTitle: string;
};

const IndexPage: NextPage<IndexPageProps> = ({documentTitle}) => {
	const [title, setTitle] = useState('');

	useEffect(() => {
		setTitle(documentTitle+':\u0020Home');
	}, [documentTitle]);

	return (
		<>
			<Head>
				<title>{ !title ? documentTitle : title }</title>
			</Head>
			<Home />
		</>
	)
};

export default IndexPage;
