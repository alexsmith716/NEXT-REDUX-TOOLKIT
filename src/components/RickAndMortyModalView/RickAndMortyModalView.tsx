import React from 'react';
import { useQuery, useLazyQuery, useApolloClient } from '@apollo/client';
import { ViewDiv, WrapperDiv, ImageDiv, CharacterName } from './styles';
import Button from '../Button';
import {
	GetRickAndMortyCharacterDocument,
	GetRickAndMortyCharacterLocationResidentsDocument,
	GetRickAndMortyCharacterEpisodesDocument,
	GetRickAndMortyEpisodeCharactersDocument,
} from '../../apollo/generated/react-apollo';
// import Loading from '../components/Loading';

function RickAndMortyModalView({ currentModalCharacter, closeModal }: any) {
	//const [queryError, setQueryError] = useState(false);

	const {
		//loading: rickAndMortyCharacterLOADING,
		//error: rickAndMortyCharacterERROR,
		//data: rickAndMortyCharacterDATA,
	} = useQuery(GetRickAndMortyCharacterDocument, {
		variables: {
			id: currentModalCharacter.id,
		},
		notifyOnNetworkStatusChange: true,
		onError: (rickAndMortyCharacterERROR) => {
			console.log(rickAndMortyCharacterERROR);
			//setQueryError(true);
		},
		//onCompleted: (rickAndMortyCharacterDATA) => {
		//	setQueryError(false);
		//},
	});

	const [getCharacterLocationResidents,{
			//loading: characterLocationResidentsLOADING,
			//error: characterLocationResidentsERROR,
			//data: characterLocationResidentsDATA,
		},
	] = useLazyQuery(GetRickAndMortyCharacterLocationResidentsDocument, {
			variables: {
				id: currentModalCharacter.id,
			},
			notifyOnNetworkStatusChange: true,
			onError: (characterLocationResidentsERROR) => {
				console.log(characterLocationResidentsERROR);
				//setQueryError(true);
			},
			//onCompleted: (characterLocationResidentsDATA) => {
			//	setQueryError(false);
			//},
		},
	);

	const [getCharacterEpisodes,{
			//loading: characterEpisodesLOADING,
			//error: characterEpisodesERROR,
			//data: characterEpisodesDATA,
		},
	] = useLazyQuery(GetRickAndMortyCharacterEpisodesDocument, {
			variables: {
				id: currentModalCharacter.id,
			},
			notifyOnNetworkStatusChange: true,
			onError: (characterEpisodesERROR) => {
				console.log(characterEpisodesERROR);
				//setQueryError(true);
			},
			//onCompleted: (characterEpisodesDATA) => {
			//	setQueryError(false);
			//},
		},
	);

	const [getEpisodeCharacters,{
			//loading: episodeCharactersLOADING,
			//error: episodeCharactersERROR,
			//data: episodeCharactersDATA,
		},
	] = useLazyQuery(GetRickAndMortyEpisodeCharactersDocument, {
			variables: {
				id: currentModalCharacter.id,
			},
			notifyOnNetworkStatusChange: true,
			onError: (episodeCharactersERROR) => {
				console.log(episodeCharactersERROR);
				//setQueryError(true);
			},
			//onCompleted: (episodeCharactersDATA) => {
			//	setQueryError(false);
			//},
		},
	);

	//useEffect(() => {
	//	console.log('currentModalCharacter.id: ', currentModalCharacter.id);
	//	console.log('currentModalCharacter: ', currentModalCharacter);
	//}, []);

	const client = useApolloClient();

	return (
		<ViewDiv>
			<WrapperDiv>
				<ImageDiv src={currentModalCharacter.image} alt={currentModalCharacter.name} />

				<div className="mb-2">
					<CharacterName>{currentModalCharacter.name}</CharacterName>
				</div>

				<div className="mb-3">
					<Button
						type="button"
						className="btn-info btn-sm"
						onClick={() => console.log('client.extract(): ', client.extract())}
						buttonText="Cache"
					/>
				</div>

				<div className="mb-3">
					<Button
						type="button"
						className="btn-secondary btn-sm"
						onClick={() => {
							getCharacterLocationResidents();
						}}
						buttonText="getCharacterLocationResidents"
					/>
				</div>

				<div className="mb-3">
					<Button
						type="button"
						className="btn-secondary btn-sm"
						onClick={() => {
							getCharacterEpisodes();
						}}
						buttonText="getCharacterEpisodes"
					/>
				</div>

				<div className="mb-3">
					<Button
						type="button"
						className="btn-secondary btn-sm"
						onClick={() => {
							getEpisodeCharacters();
						}}
						buttonText="getEpisodeCharacters"
					/>
				</div>

				<div className="display-flex justify-content-end">
					<Button
						type="button"
						className="btn-light btn-sm"
						onClick={ closeModal }
						buttonText="Close"
					/>
				</div>
			</WrapperDiv>
		</ViewDiv>
	);
}

export default RickAndMortyModalView;
