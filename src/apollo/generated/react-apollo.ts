import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AddAuthorResponse = Author | AuthorExists;

export type AddBookResponse = AuthorNameMissing | AuthorNotFound | Book;

export type Author = {
  __typename?: 'Author';
  books: Array<Book>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type AuthorExists = {
  __typename?: 'AuthorExists';
  message: Scalars['String'];
};

export type AuthorNameMissing = {
  __typename?: 'AuthorNameMissing';
  message: Scalars['String'];
};

export type AuthorNotFound = {
  __typename?: 'AuthorNotFound';
  message: Scalars['String'];
};

export type Book = {
  __typename?: 'Book';
  author?: Maybe<Author>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Character = {
  __typename?: 'Character';
  /** Time at which the character was created in the database. */
  created?: Maybe<Scalars['String']>;
  /** Episodes in which this character appeared. */
  episode: Array<Maybe<Episode>>;
  /** The gender of the character ('Female', 'Male', 'Genderless' or 'unknown'). */
  gender?: Maybe<Scalars['String']>;
  /** The id of the character. */
  id: Scalars['ID'];
  /**
   * Link to the character's image.
   * All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
   */
  image?: Maybe<Scalars['String']>;
  /** The character's last known location */
  location?: Maybe<Location>;
  /** The name of the character. */
  name?: Maybe<Scalars['String']>;
  /** The character's origin location */
  origin?: Maybe<Location>;
  rating: Scalars['Int'];
  /** The species of the character. */
  species?: Maybe<Scalars['String']>;
  /** The status of the character ('Alive', 'Dead' or 'unknown'). */
  status?: Maybe<Scalars['String']>;
  /** The type or subspecies of the character. */
  type?: Maybe<Scalars['String']>;
};

export type Characters = {
  __typename?: 'Characters';
  info?: Maybe<Info>;
  results?: Maybe<Array<Maybe<Character>>>;
};

export type Episode = {
  __typename?: 'Episode';
  /** The air date of the episode. */
  air_date?: Maybe<Scalars['String']>;
  /** List of characters who have been seen in the episode. */
  characters: Array<Maybe<Character>>;
  /** Time at which the episode was created in the database. */
  created?: Maybe<Scalars['String']>;
  /** The code of the episode. */
  episode?: Maybe<Scalars['String']>;
  /** The id of the episode. */
  id?: Maybe<Scalars['ID']>;
  /** The name of the episode. */
  name?: Maybe<Scalars['String']>;
};

export type Episodes = {
  __typename?: 'Episodes';
  info?: Maybe<Info>;
  results?: Maybe<Array<Maybe<Episode>>>;
};

export type FilterCharacter = {
  gender?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  species?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type FilterEpisode = {
  episode?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FilterLocation = {
  dimension?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type Info = {
  __typename?: 'Info';
  /** The length of the response. */
  count?: Maybe<Scalars['Int']>;
  /** Number of the next page (if it exists) */
  next?: Maybe<Scalars['Int']>;
  /** The amount of pages. */
  pages?: Maybe<Scalars['Int']>;
  /** Number of the previous page (if it exists) */
  prev?: Maybe<Scalars['Int']>;
};

export type Location = {
  __typename?: 'Location';
  /** Time at which the location was created in the database. */
  created?: Maybe<Scalars['String']>;
  /** The dimension in which the location is located. */
  dimension?: Maybe<Scalars['String']>;
  /** The id of the location. */
  id?: Maybe<Scalars['ID']>;
  /** The name of the location. */
  name?: Maybe<Scalars['String']>;
  /** List of characters who have been last seen in the location. */
  residents: Array<Maybe<Character>>;
  /** The type of the location. */
  type?: Maybe<Scalars['String']>;
};

export type Locations = {
  __typename?: 'Locations';
  info?: Maybe<Info>;
  results?: Maybe<Array<Maybe<Location>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAuthor: AddAuthorResponse;
  addBook: AddBookResponse;
};


export type MutationAddAuthorArgs = {
  name: Scalars['String'];
};


export type MutationAddBookArgs = {
  authorName?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  authors: Array<Maybe<Author>>;
  books: Array<Maybe<Book>>;
  /** Get a specific character by ID */
  character: Character;
  /** Get the list of all characters */
  characters?: Maybe<Characters>;
  /** Get a list of characters selected by ids */
  charactersByIds?: Maybe<Array<Maybe<Character>>>;
  /** Get a specific episode by ID */
  episode?: Maybe<Episode>;
  /** Get the list of all episodes */
  episodes?: Maybe<Episodes>;
  /** Get a list of episodes selected by ids */
  episodesByIds?: Maybe<Array<Maybe<Episode>>>;
  helloWorld?: Maybe<Scalars['String']>;
  /** Get a specific locations by ID */
  location?: Maybe<Location>;
  /** Get the list of all locations */
  locations?: Maybe<Locations>;
  /** Get a list of locations selected by ids */
  locationsByIds?: Maybe<Array<Maybe<Location>>>;
};


export type QueryCharacterArgs = {
  id: Scalars['ID'];
};


export type QueryCharactersArgs = {
  filter?: InputMaybe<FilterCharacter>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryCharactersByIdsArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryEpisodeArgs = {
  id: Scalars['ID'];
};


export type QueryEpisodesArgs = {
  filter?: InputMaybe<FilterEpisode>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryEpisodesByIdsArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryLocationArgs = {
  id: Scalars['ID'];
};


export type QueryLocationsArgs = {
  filter?: InputMaybe<FilterLocation>;
  page?: InputMaybe<Scalars['Int']>;
};


export type QueryLocationsByIdsArgs = {
  ids: Array<Scalars['ID']>;
};

export type FragmentAuthorFieldsFragment = { __typename?: 'Author', id: string, name: string };

export type FragmentBookFieldsFragment = { __typename?: 'Book', id: string, name: string, author?: { __typename?: 'Author', name: string } | null };

export type FragmentCharacterFragment = { __typename?: 'Character', id: string, status?: string | null, species?: string | null, type?: string | null, gender?: string | null, origin?: { __typename?: 'Location', name?: string | null, type?: string | null, dimension?: string | null } | null, location?: { __typename?: 'Location', id?: string | null, name?: string | null, type?: string | null, dimension?: string | null } | null };

export type FragmentCharacterEpisodesFragment = { __typename?: 'Character', id: string, episode: Array<{ __typename?: 'Episode', id?: string | null, name?: string | null, air_date?: string | null, episode?: string | null } | null> };

export type FragmentCharacterLocationResidentsFragment = { __typename?: 'Character', id: string, location?: { __typename?: 'Location', id?: string | null, residents: Array<{ __typename?: 'Character', name?: string | null, id: string, status?: string | null, species?: string | null, type?: string | null, gender?: string | null, origin?: { __typename?: 'Location', name?: string | null, type?: string | null, dimension?: string | null } | null, location?: { __typename?: 'Location', id?: string | null, name?: string | null, type?: string | null, dimension?: string | null } | null } | null> } | null };

export type FragmentEpisodeCharactersFragment = { __typename?: 'Character', id: string, episode: Array<{ __typename?: 'Episode', id?: string | null, characters: Array<{ __typename?: 'Character', id: string, status?: string | null, species?: string | null, type?: string | null, gender?: string | null, origin?: { __typename?: 'Location', name?: string | null, type?: string | null, dimension?: string | null } | null, location?: { __typename?: 'Location', id?: string | null, name?: string | null, type?: string | null, dimension?: string | null } | null } | null> } | null> };

export type HelloWorldQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloWorldQuery = { __typename?: 'Query', helloWorld?: string | null };

export type GetAllRickAndMortyCharactersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<FilterCharacter>;
}>;


export type GetAllRickAndMortyCharactersQuery = { __typename?: 'Query', characters?: { __typename?: 'Characters', info?: { __typename?: 'Info', count?: number | null, pages?: number | null, next?: number | null, prev?: number | null } | null, results?: Array<{ __typename?: 'Character', id: string, name?: string | null, image?: string | null } | null> | null } | null };

export type GetRickAndMortyCharacterStarRatingQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetRickAndMortyCharacterStarRatingQuery = { __typename?: 'Query', character: { __typename?: 'Character', id: string, rating: number } };

export type GetRickAndMortyCharacterQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetRickAndMortyCharacterQuery = { __typename?: 'Query', character: { __typename?: 'Character', id: string, status?: string | null, species?: string | null, type?: string | null, gender?: string | null, origin?: { __typename?: 'Location', name?: string | null, type?: string | null, dimension?: string | null } | null, location?: { __typename?: 'Location', id?: string | null, name?: string | null, type?: string | null, dimension?: string | null } | null } };

export type GetRickAndMortyCharacterLocationResidentsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetRickAndMortyCharacterLocationResidentsQuery = { __typename?: 'Query', character: { __typename?: 'Character', id: string, location?: { __typename?: 'Location', id?: string | null, residents: Array<{ __typename?: 'Character', name?: string | null, id: string, status?: string | null, species?: string | null, type?: string | null, gender?: string | null, origin?: { __typename?: 'Location', name?: string | null, type?: string | null, dimension?: string | null } | null, location?: { __typename?: 'Location', id?: string | null, name?: string | null, type?: string | null, dimension?: string | null } | null } | null> } | null } };

export type GetRickAndMortyCharacterEpisodesQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetRickAndMortyCharacterEpisodesQuery = { __typename?: 'Query', character: { __typename?: 'Character', id: string, episode: Array<{ __typename?: 'Episode', id?: string | null, name?: string | null, air_date?: string | null, episode?: string | null } | null> } };

export type GetRickAndMortyEpisodeCharactersQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetRickAndMortyEpisodeCharactersQuery = { __typename?: 'Query', character: { __typename?: 'Character', id: string, episode: Array<{ __typename?: 'Episode', id?: string | null, characters: Array<{ __typename?: 'Character', id: string, status?: string | null, species?: string | null, type?: string | null, gender?: string | null, origin?: { __typename?: 'Location', name?: string | null, type?: string | null, dimension?: string | null } | null, location?: { __typename?: 'Location', id?: string | null, name?: string | null, type?: string | null, dimension?: string | null } | null } | null> } | null> } };

export type GetBooksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBooksQuery = { __typename?: 'Query', books: Array<{ __typename?: 'Book', id: string, name: string, author?: { __typename?: 'Author', name: string } | null } | null> };

export type GetAuthorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuthorsQuery = { __typename?: 'Query', authors: Array<{ __typename?: 'Author', id: string, name: string } | null> };

export type MutateAddAuthorMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type MutateAddAuthorMutation = { __typename?: 'Mutation', addAuthor: { __typename: 'Author', id: string, name: string } | { __typename: 'AuthorExists', message: string } };

export type MutateAddBookMutationVariables = Exact<{
  name: Scalars['String'];
  authorName: Scalars['String'];
}>;


export type MutateAddBookMutation = { __typename?: 'Mutation', addBook: { __typename: 'AuthorNameMissing' } | { __typename: 'AuthorNotFound' } | { __typename: 'Book', id: string, name: string, author?: { __typename?: 'Author', name: string } | null } };

export const FragmentAuthorFieldsFragmentDoc = gql`
    fragment fragmentAuthorFields on Author {
  id
  name
}
    `;
export const FragmentBookFieldsFragmentDoc = gql`
    fragment fragmentBookFields on Book {
  id
  name
  author {
    name
  }
}
    `;
export const FragmentCharacterEpisodesFragmentDoc = gql`
    fragment fragmentCharacterEpisodes on Character {
  id
  episode {
    id
    name
    air_date
    episode
  }
}
    `;
export const FragmentCharacterFragmentDoc = gql`
    fragment fragmentCharacter on Character {
  id
  status
  species
  type
  gender
  origin {
    name
    type
    dimension
  }
  location {
    id
    name
    type
    dimension
  }
}
    `;
export const FragmentCharacterLocationResidentsFragmentDoc = gql`
    fragment fragmentCharacterLocationResidents on Character {
  id
  location {
    id
    residents {
      name
      ...fragmentCharacter
    }
  }
}
    ${FragmentCharacterFragmentDoc}`;
export const FragmentEpisodeCharactersFragmentDoc = gql`
    fragment fragmentEpisodeCharacters on Character {
  id
  episode {
    id
    characters {
      ...fragmentCharacter
    }
  }
}
    ${FragmentCharacterFragmentDoc}`;
export const HelloWorldDocument = gql`
    query HelloWorld {
  helloWorld
}
    `;

/**
 * __useHelloWorldQuery__
 *
 * To run a query within a React component, call `useHelloWorldQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloWorldQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloWorldQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloWorldQuery(baseOptions?: Apollo.QueryHookOptions<HelloWorldQuery, HelloWorldQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloWorldQuery, HelloWorldQueryVariables>(HelloWorldDocument, options);
      }
export function useHelloWorldLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloWorldQuery, HelloWorldQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloWorldQuery, HelloWorldQueryVariables>(HelloWorldDocument, options);
        }
export type HelloWorldQueryHookResult = ReturnType<typeof useHelloWorldQuery>;
export type HelloWorldLazyQueryHookResult = ReturnType<typeof useHelloWorldLazyQuery>;
export type HelloWorldQueryResult = Apollo.QueryResult<HelloWorldQuery, HelloWorldQueryVariables>;
export const GetAllRickAndMortyCharactersDocument = gql`
    query GetAllRickAndMortyCharacters($page: Int, $filter: FilterCharacter) {
  characters(page: $page, filter: $filter) {
    info {
      count
      pages
      next
      prev
    }
    results {
      id
      name
      image
    }
  }
}
    `;

/**
 * __useGetAllRickAndMortyCharactersQuery__
 *
 * To run a query within a React component, call `useGetAllRickAndMortyCharactersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllRickAndMortyCharactersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllRickAndMortyCharactersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetAllRickAndMortyCharactersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllRickAndMortyCharactersQuery, GetAllRickAndMortyCharactersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllRickAndMortyCharactersQuery, GetAllRickAndMortyCharactersQueryVariables>(GetAllRickAndMortyCharactersDocument, options);
      }
export function useGetAllRickAndMortyCharactersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllRickAndMortyCharactersQuery, GetAllRickAndMortyCharactersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllRickAndMortyCharactersQuery, GetAllRickAndMortyCharactersQueryVariables>(GetAllRickAndMortyCharactersDocument, options);
        }
export type GetAllRickAndMortyCharactersQueryHookResult = ReturnType<typeof useGetAllRickAndMortyCharactersQuery>;
export type GetAllRickAndMortyCharactersLazyQueryHookResult = ReturnType<typeof useGetAllRickAndMortyCharactersLazyQuery>;
export type GetAllRickAndMortyCharactersQueryResult = Apollo.QueryResult<GetAllRickAndMortyCharactersQuery, GetAllRickAndMortyCharactersQueryVariables>;
export const GetRickAndMortyCharacterStarRatingDocument = gql`
    query GetRickAndMortyCharacterStarRating($id: ID!) {
  character(id: $id) {
    id
    rating @client
  }
}
    `;

/**
 * __useGetRickAndMortyCharacterStarRatingQuery__
 *
 * To run a query within a React component, call `useGetRickAndMortyCharacterStarRatingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRickAndMortyCharacterStarRatingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRickAndMortyCharacterStarRatingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRickAndMortyCharacterStarRatingQuery(baseOptions: Apollo.QueryHookOptions<GetRickAndMortyCharacterStarRatingQuery, GetRickAndMortyCharacterStarRatingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRickAndMortyCharacterStarRatingQuery, GetRickAndMortyCharacterStarRatingQueryVariables>(GetRickAndMortyCharacterStarRatingDocument, options);
      }
export function useGetRickAndMortyCharacterStarRatingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRickAndMortyCharacterStarRatingQuery, GetRickAndMortyCharacterStarRatingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRickAndMortyCharacterStarRatingQuery, GetRickAndMortyCharacterStarRatingQueryVariables>(GetRickAndMortyCharacterStarRatingDocument, options);
        }
export type GetRickAndMortyCharacterStarRatingQueryHookResult = ReturnType<typeof useGetRickAndMortyCharacterStarRatingQuery>;
export type GetRickAndMortyCharacterStarRatingLazyQueryHookResult = ReturnType<typeof useGetRickAndMortyCharacterStarRatingLazyQuery>;
export type GetRickAndMortyCharacterStarRatingQueryResult = Apollo.QueryResult<GetRickAndMortyCharacterStarRatingQuery, GetRickAndMortyCharacterStarRatingQueryVariables>;
export const GetRickAndMortyCharacterDocument = gql`
    query GetRickAndMortyCharacter($id: ID!) {
  character(id: $id) {
    ...fragmentCharacter
  }
}
    ${FragmentCharacterFragmentDoc}`;

/**
 * __useGetRickAndMortyCharacterQuery__
 *
 * To run a query within a React component, call `useGetRickAndMortyCharacterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRickAndMortyCharacterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRickAndMortyCharacterQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRickAndMortyCharacterQuery(baseOptions: Apollo.QueryHookOptions<GetRickAndMortyCharacterQuery, GetRickAndMortyCharacterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRickAndMortyCharacterQuery, GetRickAndMortyCharacterQueryVariables>(GetRickAndMortyCharacterDocument, options);
      }
export function useGetRickAndMortyCharacterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRickAndMortyCharacterQuery, GetRickAndMortyCharacterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRickAndMortyCharacterQuery, GetRickAndMortyCharacterQueryVariables>(GetRickAndMortyCharacterDocument, options);
        }
export type GetRickAndMortyCharacterQueryHookResult = ReturnType<typeof useGetRickAndMortyCharacterQuery>;
export type GetRickAndMortyCharacterLazyQueryHookResult = ReturnType<typeof useGetRickAndMortyCharacterLazyQuery>;
export type GetRickAndMortyCharacterQueryResult = Apollo.QueryResult<GetRickAndMortyCharacterQuery, GetRickAndMortyCharacterQueryVariables>;
export const GetRickAndMortyCharacterLocationResidentsDocument = gql`
    query GetRickAndMortyCharacterLocationResidents($id: ID!) {
  character(id: $id) {
    ...fragmentCharacterLocationResidents
  }
}
    ${FragmentCharacterLocationResidentsFragmentDoc}`;

/**
 * __useGetRickAndMortyCharacterLocationResidentsQuery__
 *
 * To run a query within a React component, call `useGetRickAndMortyCharacterLocationResidentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRickAndMortyCharacterLocationResidentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRickAndMortyCharacterLocationResidentsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRickAndMortyCharacterLocationResidentsQuery(baseOptions: Apollo.QueryHookOptions<GetRickAndMortyCharacterLocationResidentsQuery, GetRickAndMortyCharacterLocationResidentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRickAndMortyCharacterLocationResidentsQuery, GetRickAndMortyCharacterLocationResidentsQueryVariables>(GetRickAndMortyCharacterLocationResidentsDocument, options);
      }
export function useGetRickAndMortyCharacterLocationResidentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRickAndMortyCharacterLocationResidentsQuery, GetRickAndMortyCharacterLocationResidentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRickAndMortyCharacterLocationResidentsQuery, GetRickAndMortyCharacterLocationResidentsQueryVariables>(GetRickAndMortyCharacterLocationResidentsDocument, options);
        }
export type GetRickAndMortyCharacterLocationResidentsQueryHookResult = ReturnType<typeof useGetRickAndMortyCharacterLocationResidentsQuery>;
export type GetRickAndMortyCharacterLocationResidentsLazyQueryHookResult = ReturnType<typeof useGetRickAndMortyCharacterLocationResidentsLazyQuery>;
export type GetRickAndMortyCharacterLocationResidentsQueryResult = Apollo.QueryResult<GetRickAndMortyCharacterLocationResidentsQuery, GetRickAndMortyCharacterLocationResidentsQueryVariables>;
export const GetRickAndMortyCharacterEpisodesDocument = gql`
    query GetRickAndMortyCharacterEpisodes($id: ID!) {
  character(id: $id) {
    ...fragmentCharacterEpisodes
  }
}
    ${FragmentCharacterEpisodesFragmentDoc}`;

/**
 * __useGetRickAndMortyCharacterEpisodesQuery__
 *
 * To run a query within a React component, call `useGetRickAndMortyCharacterEpisodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRickAndMortyCharacterEpisodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRickAndMortyCharacterEpisodesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRickAndMortyCharacterEpisodesQuery(baseOptions: Apollo.QueryHookOptions<GetRickAndMortyCharacterEpisodesQuery, GetRickAndMortyCharacterEpisodesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRickAndMortyCharacterEpisodesQuery, GetRickAndMortyCharacterEpisodesQueryVariables>(GetRickAndMortyCharacterEpisodesDocument, options);
      }
export function useGetRickAndMortyCharacterEpisodesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRickAndMortyCharacterEpisodesQuery, GetRickAndMortyCharacterEpisodesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRickAndMortyCharacterEpisodesQuery, GetRickAndMortyCharacterEpisodesQueryVariables>(GetRickAndMortyCharacterEpisodesDocument, options);
        }
export type GetRickAndMortyCharacterEpisodesQueryHookResult = ReturnType<typeof useGetRickAndMortyCharacterEpisodesQuery>;
export type GetRickAndMortyCharacterEpisodesLazyQueryHookResult = ReturnType<typeof useGetRickAndMortyCharacterEpisodesLazyQuery>;
export type GetRickAndMortyCharacterEpisodesQueryResult = Apollo.QueryResult<GetRickAndMortyCharacterEpisodesQuery, GetRickAndMortyCharacterEpisodesQueryVariables>;
export const GetRickAndMortyEpisodeCharactersDocument = gql`
    query GetRickAndMortyEpisodeCharacters($id: ID!) {
  character(id: $id) {
    ...fragmentEpisodeCharacters
  }
}
    ${FragmentEpisodeCharactersFragmentDoc}`;

/**
 * __useGetRickAndMortyEpisodeCharactersQuery__
 *
 * To run a query within a React component, call `useGetRickAndMortyEpisodeCharactersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRickAndMortyEpisodeCharactersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRickAndMortyEpisodeCharactersQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRickAndMortyEpisodeCharactersQuery(baseOptions: Apollo.QueryHookOptions<GetRickAndMortyEpisodeCharactersQuery, GetRickAndMortyEpisodeCharactersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRickAndMortyEpisodeCharactersQuery, GetRickAndMortyEpisodeCharactersQueryVariables>(GetRickAndMortyEpisodeCharactersDocument, options);
      }
export function useGetRickAndMortyEpisodeCharactersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRickAndMortyEpisodeCharactersQuery, GetRickAndMortyEpisodeCharactersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRickAndMortyEpisodeCharactersQuery, GetRickAndMortyEpisodeCharactersQueryVariables>(GetRickAndMortyEpisodeCharactersDocument, options);
        }
export type GetRickAndMortyEpisodeCharactersQueryHookResult = ReturnType<typeof useGetRickAndMortyEpisodeCharactersQuery>;
export type GetRickAndMortyEpisodeCharactersLazyQueryHookResult = ReturnType<typeof useGetRickAndMortyEpisodeCharactersLazyQuery>;
export type GetRickAndMortyEpisodeCharactersQueryResult = Apollo.QueryResult<GetRickAndMortyEpisodeCharactersQuery, GetRickAndMortyEpisodeCharactersQueryVariables>;
export const GetBooksDocument = gql`
    query GetBooks {
  books {
    id
    name
    author {
      name
    }
  }
}
    `;

/**
 * __useGetBooksQuery__
 *
 * To run a query within a React component, call `useGetBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBooksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBooksQuery(baseOptions?: Apollo.QueryHookOptions<GetBooksQuery, GetBooksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBooksQuery, GetBooksQueryVariables>(GetBooksDocument, options);
      }
export function useGetBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBooksQuery, GetBooksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBooksQuery, GetBooksQueryVariables>(GetBooksDocument, options);
        }
export type GetBooksQueryHookResult = ReturnType<typeof useGetBooksQuery>;
export type GetBooksLazyQueryHookResult = ReturnType<typeof useGetBooksLazyQuery>;
export type GetBooksQueryResult = Apollo.QueryResult<GetBooksQuery, GetBooksQueryVariables>;
export const GetAuthorsDocument = gql`
    query GetAuthors {
  authors {
    id
    name
  }
}
    `;

/**
 * __useGetAuthorsQuery__
 *
 * To run a query within a React component, call `useGetAuthorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAuthorsQuery(baseOptions?: Apollo.QueryHookOptions<GetAuthorsQuery, GetAuthorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAuthorsQuery, GetAuthorsQueryVariables>(GetAuthorsDocument, options);
      }
export function useGetAuthorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAuthorsQuery, GetAuthorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAuthorsQuery, GetAuthorsQueryVariables>(GetAuthorsDocument, options);
        }
export type GetAuthorsQueryHookResult = ReturnType<typeof useGetAuthorsQuery>;
export type GetAuthorsLazyQueryHookResult = ReturnType<typeof useGetAuthorsLazyQuery>;
export type GetAuthorsQueryResult = Apollo.QueryResult<GetAuthorsQuery, GetAuthorsQueryVariables>;
export const MutateAddAuthorDocument = gql`
    mutation MutateAddAuthor($name: String!) {
  addAuthor(name: $name) {
    __typename
    ... on AuthorExists {
      __typename
      message
    }
    ... on Author {
      __typename
      ...fragmentAuthorFields
    }
  }
}
    ${FragmentAuthorFieldsFragmentDoc}`;
export type MutateAddAuthorMutationFn = Apollo.MutationFunction<MutateAddAuthorMutation, MutateAddAuthorMutationVariables>;

/**
 * __useMutateAddAuthorMutation__
 *
 * To run a mutation, you first call `useMutateAddAuthorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutateAddAuthorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutateAddAuthorMutation, { data, loading, error }] = useMutateAddAuthorMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useMutateAddAuthorMutation(baseOptions?: Apollo.MutationHookOptions<MutateAddAuthorMutation, MutateAddAuthorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutateAddAuthorMutation, MutateAddAuthorMutationVariables>(MutateAddAuthorDocument, options);
      }
export type MutateAddAuthorMutationHookResult = ReturnType<typeof useMutateAddAuthorMutation>;
export type MutateAddAuthorMutationResult = Apollo.MutationResult<MutateAddAuthorMutation>;
export type MutateAddAuthorMutationOptions = Apollo.BaseMutationOptions<MutateAddAuthorMutation, MutateAddAuthorMutationVariables>;
export const MutateAddBookDocument = gql`
    mutation MutateAddBook($name: String!, $authorName: String!) {
  addBook(name: $name, authorName: $authorName) {
    __typename
    ... on Book {
      __typename
      ...fragmentBookFields
    }
  }
}
    ${FragmentBookFieldsFragmentDoc}`;
export type MutateAddBookMutationFn = Apollo.MutationFunction<MutateAddBookMutation, MutateAddBookMutationVariables>;

/**
 * __useMutateAddBookMutation__
 *
 * To run a mutation, you first call `useMutateAddBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutateAddBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutateAddBookMutation, { data, loading, error }] = useMutateAddBookMutation({
 *   variables: {
 *      name: // value for 'name'
 *      authorName: // value for 'authorName'
 *   },
 * });
 */
export function useMutateAddBookMutation(baseOptions?: Apollo.MutationHookOptions<MutateAddBookMutation, MutateAddBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutateAddBookMutation, MutateAddBookMutationVariables>(MutateAddBookDocument, options);
      }
export type MutateAddBookMutationHookResult = ReturnType<typeof useMutateAddBookMutation>;
export type MutateAddBookMutationResult = Apollo.MutationResult<MutateAddBookMutation>;
export type MutateAddBookMutationOptions = Apollo.BaseMutationOptions<MutateAddBookMutation, MutateAddBookMutationVariables>;