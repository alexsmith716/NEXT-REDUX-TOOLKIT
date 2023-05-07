import type { NextPage } from 'next';
import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { useQuery, NetworkStatus, } from '@apollo/client';
import { useInView } from 'react-intersection-observer';
import { Character } from '../apollo/generated/react-apollo';
import { CharactersInfo } from '../types';
import Loading from '../components/Loading';
import Button from '../components/Button';
import RickAndMortyCharacter from '../components/RickAndMortyCharacter/RickAndMortyCharacter';
import Modal from '../components/Modal/Modal';
import RickAndMortyModalView from '../components/RickAndMortyModalView/RickAndMortyModalView';
import { GetAllRickAndMortyCharactersDocument } from '../apollo/generated/react-apollo';

interface RickAndMortyPageProps {
	documentTitle?: string;
};

const RickAndMorty: NextPage<RickAndMortyPageProps> = ({ documentTitle }) => {
	const [title, setTitle] = useState('');
	const [queryPage, setQueryPage] = useState<number | null>(null);
	const [rickAndMortyCharactersInfo, setRickAndMortyCharactersInfo] = useState<CharactersInfo|null>(null);
	const [rickAndMortyCharactersCurrentPage, setRickAndMortyCharactersCurrentPage] = useState<number | null>(null);
	const [charactersLoaded, setCharactersLoaded] = useState<number | null>(null);
	const [allCharactersLoaded, setAllCharactersLoaded] = useState(false);
	const [queryError, setQueryError] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [currentModalCharacter, setCurrentModalCharacter] = useState<any|null>(null);
	
	const {
		loading,
		error,
		data,
		networkStatus,
		fetchMore,
	} = useQuery(GetAllRickAndMortyCharactersDocument, {
		notifyOnNetworkStatusChange: true,
		// ***** still going over this. getting a React warning but setState inside 'onCompleted' should work? *****
		//  onError: (error) => {
		//    console.error(error);
		//    setQueryError(true);
		//  },
		//  onCompleted: (data) => {
		//    setQueryPage(data.characters.info.next);
		//    setQueryError(false);
		//    const { characters: { info } } = data;
		//    if (info) {
		//      setRickAndMortyCharactersInfo(info);
		//      if (!info.prev && info.next) {
		//        setRickAndMortyCharactersCurrentPage(1);
		//        setCharactersLoaded((info.next - 1)*20);
		//      } else if (info.next && info.prev) {
		//        setRickAndMortyCharactersCurrentPage(info.next - 1);
		//        setCharactersLoaded((info.next - 1)*20);
		//      } else {
		//        setRickAndMortyCharactersCurrentPage(info.pages);
		//        setCharactersLoaded(info.count);
		//        setAllCharactersLoaded(true);
		//      }
		//    }
		//  },
	});

	const isFetchingMore = networkStatus === NetworkStatus.fetchMore;

	useEffect(() => {
		if(error) {
			console.error(error);
			setQueryError(true);
		}
	}, [error]);

	useEffect(() => {
		if(data && data.characters?.info) {
			setQueryPage(data.characters.info.next);
			setQueryError(false);
			const { characters: { info } } = data;
			if (info) {
				setRickAndMortyCharactersInfo(info);
				if (!info.prev && info.next) {
					setRickAndMortyCharactersCurrentPage(1);
					setCharactersLoaded((info.next - 1)*20);
				} else if (info.next && info.prev) {
					setRickAndMortyCharactersCurrentPage(info.next - 1);
					setCharactersLoaded((info.next - 1)*20);
				} else {
					setRickAndMortyCharactersCurrentPage(info.pages);
					setCharactersLoaded(info.count);
					setAllCharactersLoaded(true);
				}
			}
		}
	}, [data]);

	useEffect(() => {
		setTitle(documentTitle+':\u0020graphqlquery');
	}, [documentTitle]);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};

	//@ts-ignore
	const { ref, inView, entry } = useInView({
		fallbackInView: true,
		//delay: 250,
		onChange: async inView => {
			if (inView && queryPage && !isFetchingMore) {
				try{
					await fetchMore({
						variables: {
							page: queryPage
						}
					});
				} catch(error) {
					console.error(error);
					setQueryError(true);
				}
			}
		},
	});

	const toggleModal = useCallback(() => {
		setOpenModal(!openModal);
	}, [openModal]);

	const onView = (characterID: any) => {
		setCurrentModalCharacter(data.characters.results.find((item: any) => item.id === characterID));
	};

	return (
		<>
			<Head>
				<title>{ !title ? documentTitle : title }</title>
			</Head>

			<div className="container">
				{/* ---------------------------------------------- */}

				<h1 className="mt-4 mb-3">The Rick And Morty Page</h1>

				{/* ---------------------------------------------- */}

				<div className="bg-color-ivory container-padding-border-radius-1 overflow-wrap-break-word mb-5">

					{loading && (
						<div className="flex-column align-items-center">
							<div className="text-center">
								<div className="container-padding-radius-10">
									<Loading text="Loading" />
								</div>
							</div>
						</div>
					)}

					{error && (
						<div className="flex-column align-items-center mb-3">
							<div className="text-center">
								<div className="bg-warn-red container-padding-radius-10 text-color-white">
									Error when attempting to fetch resource.
								</div>
							</div>
						</div>
					)}

					{rickAndMortyCharactersCurrentPage && rickAndMortyCharactersInfo && (
						<div className="mb-3">
							<h5>{`Page ${rickAndMortyCharactersCurrentPage} of ${rickAndMortyCharactersInfo.pages}`}</h5>
						</div>
					)}

					<div className="row-grid-rickandmorty">
						{data && data.characters?.results?.map((character: Character, index:number) => (
							<div key={index} className="mb-3 container-padding-border-radius-2">
								<div
									onClick={() => {
										toggleModal();
										onView(character.id);
									}}
								>
									<RickAndMortyCharacter character={character} index={index} />
								</div>
							</div>
						))}
						<div ref={ref}></div>
					</div>

					{rickAndMortyCharactersCurrentPage && rickAndMortyCharactersInfo && (
						<div className="mb-3">
							<div>
								<h5>{`Page ${rickAndMortyCharactersCurrentPage} of ${rickAndMortyCharactersInfo.pages}`}</h5>
							</div>
							<div>
								<h5>{`Characters Loaded: ${charactersLoaded}`}</h5>
							</div>
						</div>
					)}

					{!isFetchingMore && (
						<div className="mb-3">
							<Button
								type="button"
								className={`btn-primary btn-md ${allCharactersLoaded ? 'disabled' : ''}`}
								onClick={ async () => {
									try{
										await fetchMore({
											variables: {
												page: !queryPage ? 1 : queryPage,
											}
										});
									} catch(error) {
										console.error(error);
										setQueryError(true);
									}
								}}
								buttonText="Fetch More"
							/>
						</div>
					)}

					{data && !isFetchingMore && (
						<div className="mb-3">
							<Button
								type="button"
								className="btn-secondary btn-md"
								onClick={scrollToTop}
								buttonText="Scroll To Top"
							/>
						</div>
					)}

					{queryError && data && (
						<div className="flex-column align-items-center">
							<div className="text-center">
								<div className="bg-warn-red container-padding-radius-10 text-color-white">
									Error when attempting to fetch resource.
								</div>
							</div>
						</div>
					)}
				</div>

			</div>
			{openModal && (
				<Modal toggleModal={toggleModal}>
					<RickAndMortyModalView currentModalCharacter={currentModalCharacter} closeModal={toggleModal} />
				</Modal>
			)}
		</>
	);
};

export default RickAndMorty;
