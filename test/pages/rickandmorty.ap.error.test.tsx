import { cleanup, screen } from '@testing-library/react';
import { mockRender } from '../mockRender';
import RickAndMorty from '../../src/pages/graphqlquery';

describe("RickAndMorty Page", () => {
	afterEach(() => {
		cleanup();
	})

	it("should show error message when characters query fails", async () => {
		await mockRender(<RickAndMorty />, {
			mocks: {
				Query: {
					characters: () => {
						throw new Error("The query encountered one or more errors. This ApolloError object contains either a networkError object or a graphQLErrors array, depending on the error(s) that occurred.");
					}
				}
			}
		});

		expect(await screen.findByText("Error when attempting to fetch resource.")).toBeInTheDocument();
	});
});
