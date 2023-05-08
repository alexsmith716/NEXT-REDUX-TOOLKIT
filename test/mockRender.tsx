import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { addMocksToSchema } from '@graphql-tools/mock';
import { render } from "@testing-library/react";
import { schema } from './mockSchema';

export async function mockRender(component: any, { mocks }: any = {}) {

	const mockSchema = addMocksToSchema({
		schema,
		resolvers: () => mocks
	});

	const client = new ApolloClient({
		link: new SchemaLink({ schema: mockSchema }),
		cache: new InMemoryCache()
	});

	return await render(
		<ApolloProvider client={client}>
			{ component }
		</ApolloProvider>
	);
}
