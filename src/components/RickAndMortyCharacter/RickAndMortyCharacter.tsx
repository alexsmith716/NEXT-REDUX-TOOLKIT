import React, { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { Character } from '../../apollo/generated/react-apollo';
import StarRating from '../StarRating';
import { GetRickAndMortyCharacterStarRatingDocument} from '../../apollo/generated/react-apollo';

import { Thumbnail, ThumbnailImage } from '../../styles';

function RickAndMortyCharacter({character, index}: {character: Character; index: number}) {
	const [theStarRating, setTheStarRating] = useState<number | undefined>();

	const client = useApolloClient();

	useEffect(() => {
		const { character: { rating } } = client.readQuery({
			query: GetRickAndMortyCharacterStarRatingDocument,
			variables: { id: character.id },
		}) || {"character": {"rating": 0}};
		setTheStarRating(rating);
	}, [client, character.id]);

	return (
		<>
			<div className="mb-2">
				<StarRating rating={theStarRating} />
			</div>
			<div className="cursor-pointer">
				<Thumbnail>
					{character.image ? (
						//@ts-ignore
						<ThumbnailImage src={character.image} alt={character.name} />
					) : (
						<div className="text-center">
							<i>Image not found</i>
						</div>
					)}
				</Thumbnail>
				<div className="text-center">
					{character.name ? <h4>{character.name} <span><h5>{index+1}</h5></span></h4> : <i>Name not found</i>}
				</div>
			</div>
		</>
	);
};

export default RickAndMortyCharacter;
