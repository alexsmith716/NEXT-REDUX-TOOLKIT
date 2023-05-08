import { ApolloClient, HttpLink, InMemoryCache, from, NormalizedCacheObject } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
//import { RetryLink } from "@apollo/client/link/retry";
import { IncomingMessage, ServerResponse } from 'http';
import { SchemaLink } from '@apollo/client/link/schema';
import { useMemo } from 'react';
import merge from 'deepmerge';
import schema from './schema';
import { Character } from '../types';
import { GetRickAndMortyCharacterStarRatingDocument} from './generated/react-apollo';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export type ResolverContext = {
	req?: IncomingMessage
	res?: ServerResponse
};

const errorLink = onError(({ graphQLErrors, networkError, response }) => {
	if (graphQLErrors) {
		//console.error('errorLink > graphQLErrors[0].message:', graphQLErrors[0].message);
		//console.error('errorLink > graphQLErrors[0].extensions.code:', graphQLErrors[0].extensions.code);
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.error(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
			),
		);

		if (!response || !response.data) {
			//error function
		};
	};

	if (networkError) {
		console.error(`[Network error]: ${networkError}`);
		//error function
	};
});

function createIsomorphLink(context: ResolverContext = {}) {
	if (typeof window === 'undefined') {
		return new SchemaLink({ schema, context })
	} else {
		return new HttpLink({
			uri: '/api/graphql',
			credentials: 'same-origin',
		})
	}
};

export const cache: InMemoryCache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				characters: {
					keyArgs: false,
					merge(existing = {}, incoming, { readField, }) {
						let results: Character[] = [];

						if (existing && existing.results) {
							results = results.concat(existing.results);
						}

						if (incoming && apolloClient) {
							for(let i=0; i < incoming.results.length; i++) {
								apolloClient.writeQuery({
									query: GetRickAndMortyCharacterStarRatingDocument,
									data: {
										character: {
											__typename: 'Character',
											id: readField('id', incoming.results[i]),
											rating: (Math.floor(Math.random() * (100 - 1)) + 1)
										},
									},
									variables: {
										id: readField('id', incoming.results[i])
									}
								});
							}
						}

						if (incoming && incoming.results) {
							results = results.concat(incoming.results);
						}
						return {
							...incoming,
							results,
						};
					}
				}
			}
		}
	}
});

function createApolloClient(context?: ResolverContext) {
	return new ApolloClient({
		ssrMode: typeof window === 'undefined',
		link: from([errorLink, createIsomorphLink(context)]),
		cache: cache,
	});
};

export function initializeApollo(initialState: NormalizedCacheObject | null = null, context?: ResolverContext) {
	const _apolloClient = apolloClient ?? createApolloClient(context)
	if (initialState) {
		const existingCache = _apolloClient.extract();
		const data = merge(initialState, existingCache);
		_apolloClient.cache.restore(data);
	};

	if (typeof window === 'undefined') {
		return _apolloClient;
	};

	if (!apolloClient) {
		apolloClient = _apolloClient;
	};

	return _apolloClient;
};

export function useApollo(initialState: any) {
	const store = useMemo(() => initializeApollo(initialState), [initialState]);
	return store
};
