import { cleanup, screen } from '@testing-library/react';
import { mockRender } from '../mockRender';
import RickAndMorty from '../../src/pages/graphqlquery';

const mockDataInit = {
	__typename: "Characters",
	info: {
		__typename: "Info",
		next: 2,
		prev: null,
		pages: 42,
		count: 826
	},
	results: [
		{
			__typename: "Character",
			id: "1",
			name: "Rick Sanchez",
			image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
		},
	]
};

const mockDataFetchMore = {
	__typename: "Characters",
	info: {
		__typename: "Info",
		next: 3,
		prev: 1,
		pages: 42,
		count: 826
	},
	results: [
		{
			__typename: "Character",
			id: "21",
			name: "Aqua Morty",
			image: "https://rickandmortyapi.com/api/character/avatar/21.jpeg"
		},
	]
};

describe("RickAndMorty Page", () => {
	afterEach(() => {
		cleanup();
	})

	it("should display Page 1 of pages for the Inital Page Load and a Character", async () => {

		await mockRender(<RickAndMorty />, {
			mocks: {
				Query: {
					characters: () => ( mockDataInit )
				}
			}
		});

		expect(await screen.findByText("The Rick And Morty Page")).toBeInTheDocument();
		expect(await screen.findByText("Rick Sanchez")).toBeInTheDocument();
		const page = await screen.findAllByText("Page 1 of 42");
		expect(page).toBeTruthy();
		expect(page).toHaveLength(2);
	});

	it("should display Page 2 of pages for the First Page fetch and a Character", async () => {

		await mockRender(<RickAndMorty />, {
			mocks: {
				Query: {
					characters: () => ( mockDataFetchMore )
				}
			}
		});

		expect(await screen.findByText("The Rick And Morty Page")).toBeInTheDocument();
		expect(await screen.findByText("Aqua Morty")).toBeInTheDocument();
		const page = await screen.findAllByText("Page 2 of 42");
		expect(page).toBeTruthy();
		expect(page).toHaveLength(2);
	});
});
