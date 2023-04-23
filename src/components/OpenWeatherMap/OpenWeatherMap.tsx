import React, { useState, useEffect, } from 'react';
import { fetchOpenWeatherMapAddress, fetchOpenWeatherMap } from '../../utils/fetchOpenWeatherMap';

import Loading from '../Loading';
import Button from '../Button';
import * as Styles from './styles';
import { LatLonType } from '../../types';

type OpenWeatherMapData = {
	weather?: {
		main: string | null;
		description: string | null;
	};
	main?: {
		temp: number | null;
	};
	name?: string | null;
	location?: string | null;
};

const OpenWeatherMap = () => {
	const [openWeatherMapDataLoading, setOpenWeatherMapDataLoading] = useState(true);
	const [openWeatherMapDataError, setOpenWeatherMapDataError] = useState(false);

	const [openWeatherMapData, setOpenWeatherMapData] = useState<OpenWeatherMapData|null>(null);
	//const [openWeatherSearchInput, setOpenWeatherSearchInput] = useState('');

	const startingGeo = '    nEw    yOrK,    Ny    ,      uS     ';

	let openWeatherMapDataTemp;

	const formatter = new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 1,
		maximumFractionDigits: 1,
	});

	if(openWeatherMapData && !openWeatherMapDataError) {
		openWeatherMapDataTemp = formatter.format(Number(openWeatherMapData?.main?.temp));
	}

	useEffect(() => {
		(async () => {
			await fetchOpenWeatherMapAddress(startingGeo)
				.then((response) => {
					fetchOpenWeatherMap((response as unknown) as LatLonType)
						.then((response) => {
							setOpenWeatherMapDataLoading(false);
							let data = {
								weather: {
									main: response.weather[0].main,
									description: response.weather[0].description
								},
								main: {
									temp: response.main.temp
								},
								name: response.name
							};
							setOpenWeatherMapData(data);
						})
						.catch(() => {
							setOpenWeatherMapDataLoading(false);
							setOpenWeatherMapDataError(true);
						});
				})
				.catch(() => {
					setOpenWeatherMapDataLoading(false);
					setOpenWeatherMapDataError(true);
				});
		})();
	}, []);

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
								The Exclusive <i>OpenWeather.com</i> forecast {openWeatherMapData?.name && <>for:</>}
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
								<div className="mb-1"><Styles.DataMessage>{openWeatherMapData.weather?.main}</Styles.DataMessage>&nbsp;-&nbsp;<Styles.DataMessage>{openWeatherMapData.weather?.description}</Styles.DataMessage></div>
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
											//value={openWeatherSearchInput}
											//onChange={(e) => setOpenWeatherSearchInput(e.target.value)}
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
									//onClick={() => fetchOpenWeather(openWeatherSearchInput)}
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
