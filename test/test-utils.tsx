import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { DefaultOptions, Resolvers } from '@apollo/client/core';
import { ApolloCache } from '@apollo/client/cache';

type RenderApolloOptions<TSerializedCache = {}> = {
	mocks?: MockedResponse[],
	addTypename?: boolean,
	defaultOptions?: DefaultOptions,
	cache?: ApolloCache<TSerializedCache>,
	resolvers?: Resolvers,
}

const renderApollo = (node: ReactElement,{ mocks, addTypename, defaultOptions, cache, resolvers, ...options }: RenderApolloOptions = {},) => {
	return render(
		<MockedProvider
			mocks={mocks}
			addTypename={addTypename}
			defaultOptions={defaultOptions}
			cache={cache}
			resolvers={resolvers}
		>
			{node}
		</MockedProvider>,
		options,
	);
};

export * from '@testing-library/react';
export { renderApollo };
