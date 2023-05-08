import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from '../src/apollo/type-defs';

export const schema = makeExecutableSchema({
	typeDefs,
});
