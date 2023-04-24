import React, { useState, useEffect, useCallback } from 'react';

import { fetchOpenWeatherMapAddress, fetchOpenWeatherMap } from '../../utils/componentFetchers';
import { validateInput } from '../../utils/cityStateCountryInputValidate';
import { formatInput  } from '../../utils/cityStateCountryInputFormat';

import Loading from '../Loading';
import Button from '../Button';
import * as Styles from './styles';
import { OpenWeatherMapType, LatLonType } from '../../types';

const OpenWeatherMap = () => {
	const [openWeatherMapDataLoading, setOpenWeatherMapDataLoading] = useState(true);
	const [openWeatherMapDataError, setOpenWeatherMapDataError] = useState(false);
	const [openWeatherSearchInput, setOpenWeatherSearchInput] = useState('');

	const [openWeatherMapData, setOpenWeatherMapData] = useState<OpenWeatherMapType|null>(null);

	const startingGeo = "    nEw    yOrK,    Ny    ,      uS     ";

	let openWeatherMapDataTemp;

	const formatter = new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 1,
		maximumFractionDigits: 1,
	});

	if(openWeatherMapData && !openWeatherMapDataError) {
		openWeatherMapDataTemp = formatter.format(Number(openWeatherMapData?.main?.temp));
	}

	function setLoading() {
		setOpenWeatherMapDataLoading(true);
		setOpenWeatherMapDataError(false);
		setOpenWeatherMapData(null);
	};

	function setLoaded() {
		setOpenWeatherMapDataLoading(false);
		setOpenWeatherMapDataError(false);
	};

	function setError() {
		setOpenWeatherMapDataLoading(false);
		setOpenWeatherMapDataError(true);
	};

	// TODO: useCallback()
	async function fetchTheWeather(searchVar: string) {
		setLoading();

		if (!validateInput(searchVar)) {
			setError();
			return;
		}

		const gc:string | undefined = formatInput(searchVar, false);
		setOpenWeatherSearchInput(gc as string);

		await fetchOpenWeatherMapAddress(searchVar)
			.then((response) => {
				fetchOpenWeatherMap((response as unknown) as LatLonType)
					.then((response) => {
						setLoaded();
						setOpenWeatherMapData(response);
					})
					.catch(() => {
						setError();
					});
			})
			.catch(() => {
				setError();
			});
	};

	useEffect(() => {
		// TODO: useCallback()
		fetchTheWeather(startingGeo);
	}, [ fetchTheWeather ]);

	return (
		<div className="container" data-testid="openweathermap-component">
			<Styles.OpenWeathermapContainerBgColor className="flex-column align-items-center mb-5">
				<Styles.OpenWeathermapContainer className="flex-column align-items-center">
					{/* (>>>>>>>>>>>>>>>>>>>>>> LOADING >>>>>>>>>>>>>>>>>>>>>>>>) */}
					{openWeatherMapDataLoading && <Loading text="Loading" />}

					{/* (>>>>>>>>>>>>>>>>>>>>>> LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}
					{!openWeatherMapDataLoading && (
						<>

							<Styles.OpenWeathermapHeader className="mb-1">
								The Exclusive <i>OpenWeather.com</i> forecast {openWeatherMapData && !openWeatherMapDataError && <>for:</>}
							</Styles.OpenWeathermapHeader>

							<div className="mb-1" data-testid="open-weather-data">
								{!openWeatherMapData && openWeatherMapDataError && (
									<Styles.DataMessageError>Error when attempting to fetch resource.</Styles.DataMessageError>
									)}

								{openWeatherMapData && !openWeatherMapDataError && (
									<Styles.DataMessageName>{openWeatherMapData.name}</Styles.DataMessageName>
									)}
							</div>

							{openWeatherMapData && !openWeatherMapDataError && (
								<div className="mb-1"><Styles.DataMessage>{openWeatherMapData.weather[0].main}</Styles.DataMessage>&nbsp;-&nbsp;<Styles.DataMessage>{openWeatherMapData.weather[0].description}</Styles.DataMessage></div>
								)}

							{openWeatherMapData && !openWeatherMapDataError && (
								<div><Styles.DataMessageTemp>{openWeatherMapDataTemp}&#x00B0;F</Styles.DataMessageTemp></div>
								)}

							<div className="mt-2 mb-3">
								<div className="display-flex justify-content-center">
									<div>
										<input
											type="text"
											className="form-control"
											name="openWeatherSearchInput"
											value={openWeatherSearchInput}
											onChange={(e) => setOpenWeatherSearchInput(e.target.value)}
											//placeholder={`${locationArray[int]}`}
											data-testid="open-weather-data-form-input"
										/>
										<span><Styles.InputFormat>&#123;city name&#125;,&nbsp;&nbsp;&#123;state code&nbsp;(only for the US)&#125;,&nbsp;&nbsp;&#123;country code&#125;</Styles.InputFormat></span>
									</div>
								</div>
							</div>

							<div data-testid="open-weather-data-form-button">
								<Button
									className="btn-primary btn-md"
									onClick={() => fetchTheWeather(openWeatherSearchInput)}
									buttonText="Fetch"
								/>
							</div>
						</>
					)}

				</Styles.OpenWeathermapContainer>
			</Styles.OpenWeathermapContainerBgColor>
		</div>
	);
};

export default OpenWeatherMap;
