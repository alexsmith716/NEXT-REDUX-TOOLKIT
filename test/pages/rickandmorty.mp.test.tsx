import React from 'react';
import { InMemoryCache } from '@apollo/client';
//import { render, cleanup, screen } from '@testing-library/react';
//import { MockedProvider } from '@apollo/client/testing';

import { renderApollo, cleanup, screen } from '../test-utils';

import RickAndMorty from '../../src/pages/graphqlquery';
import { GetAllRickAndMortyCharactersDocument } from '../../src/apollo/generated/react-apollo';

const mockCharacters = [
	{
		__typename: 'Character',
		id: '1',
		name: 'Rick Sanchez',
		image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
	},
	{
		__typename: 'Character',
		id: '20',
		name: 'Ants in my Eyes Johnson',
		image: 'https://rickandmortyapi.com/api/character/avatar/20.jpeg'
	}
];

describe('RickAndMorty Page', () => {

	afterEach(cleanup);

	it('renders characters', async () => {
		const cache = new InMemoryCache();
		const mocks = [
			{
				request: {
					query: GetAllRickAndMortyCharactersDocument,
				},
				result: {
					data: {
						characters: {
							__typename: 'Characters',
							info: {
								__typename: 'Info',
								next: 2,
								prev: null,
								pages: 42,
								count: 826
							},
							results: mockCharacters
						}
					}
				}
			}
		];
		{/* render(
			<MockedProvider mocks={mocks} cache={cache} addTypename={true}>
				<RickAndMorty />
			</MockedProvider>
		); */}
		await renderApollo(<RickAndMorty />, {
			mocks,
			cache,
		});
		expect(await screen.findByText('The Rick And Morty Page')).toBeInTheDocument();
		expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
		expect(await screen.findByText('Ants in my Eyes Johnson')).toBeInTheDocument();
	});
});
