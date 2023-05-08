import axios from 'axios';
import { print } from 'graphql/language/printer';

import {
	GetAllRickAndMortyCharacters,
	GetRickAndMortyCharacter,
	GetRickAndMortyCharacterLocationResidents,
	GetRickAndMortyCharacterEpisodes,
	GetRickAndMortyEpisodeCharacters,
} from './queries/queries.graphql';

import { FilterCharacter } from './generated/react-apollo';

export class RickAndMortyAPI {
	constructor() { }

	graphqlClient({ query = '', variables = {}, }) {
		const endpoint = 'https://rickandmortyapi.com/graphql';
		const headers = {
			//'Content-Type': 'application/json;',
			'Accept-Encoding': '', //gzip,deflate,compress
		};
		const params = {
			query: query,
			variables: { ...variables },
		};
		return axios({
			url: endpoint,
			method: 'post',
			headers: headers,
			data: params
		})
			.then((response) => {
				if(response.data && response.data.characters) {
					const {data: { characters },} = response.data;
					if(characters.results && characters.results.length < 1){
						return Promise.reject();
					}
				}
				//console.log('>>>>>>> RickAndMortyAPI > axios > response:', response)
				//console.log('>>>>>>> RickAndMortyAPI > axios > response.data:', JSON.stringify(response.data))

				return response.data;
			})
			.catch((error) => {
				console.error(error);
				return Promise.reject();
			});
	};

	async GetAllRickAndMortyCharacters(page?: number, filter?: FilterCharacter, ) {
		try {
			const response = await this.graphqlClient({
				query: print(GetAllRickAndMortyCharacters),
				variables: {
					page: page,
					filter: filter
				},
			});
			const {data: { characters },} = response;
			return characters;
		} catch (error) {
			console.error(error);
			return Promise.reject();
		}
	};

	async GetRickAndMortyCharacter( id: number, ) {
		try {
			const response = await this.graphqlClient({
				query: print(GetRickAndMortyCharacter),
				variables: {id: id},
			});
			const {data: { character },} = response;
			return character;
		} catch (error) {
			console.error(error);
			return Promise.reject();
		}
	};

	async GetRickAndMortyCharacterLocationResidents( id: number, ) {
		try {
			const response = await this.graphqlClient({
				query: print(GetRickAndMortyCharacterLocationResidents),
				variables: {id: id},
			});
			const {data: { character },} = response;
			return character;
		} catch (error) {
			console.error(error);
			return Promise.reject();
		}
	};

	async GetRickAndMortyCharacterEpisodes( id: number, ) {
		try {
			const response = await this.graphqlClient({
				query: print(GetRickAndMortyCharacterEpisodes),
				variables: {id: id},
			});
			const {data: { character },} = response;
			return character;
		} catch (error) {
			console.error(error);
			return Promise.reject();
		}
	};

	async GetRickAndMortyEpisodeCharacters( id: number, ) {
		try {
			const response = await this.graphqlClient({
				query: print(GetRickAndMortyEpisodeCharacters),
				variables: {id: id},
			});
			const {data: { character },} = response;
			return character;
		} catch (error) {
			console.error(error);
			return Promise.reject();
		}
	};
};
