import { waitFor, cleanup } from '@testing-library/react';
import { mockRender } from '../mockRender';
import RickAndMorty from '../../src/pages/graphqlquery';

describe("RickAndMorty Page", () => {
	afterEach(() => {
		cleanup();
		jest.resetAllMocks();
	})

	it("should call the initial characters query with 'undefined' as correct page variable", async () => {
		const charactersQuerySpy = jest.fn();

		await mockRender(<RickAndMorty />, {
			mocks: {
				Query: {
					characters: charactersQuerySpy
				}
			}
		});

		await waitFor(() => expect(charactersQuerySpy).toBeCalled());
		expect(charactersQuerySpy.mock.calls[0][1]).toEqual({ page: undefined });
		charactersQuerySpy.mockReset();
	});
});
