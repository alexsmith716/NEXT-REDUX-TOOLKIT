import React, { useState, useEffect, useReducer } from 'react';
import {
	getAddress,
	fetchOpenWeatherMapError,
	fetchOpenWeatherMap,
	openWeatherMapSliceData,
} from './openWeatherMapSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { validateInput } from '../../utils/cityStateCountryInputValidate';
import { formatInput  } from '../../utils/cityStateCountryInputFormat';
import { incrementReducer } from '../../utils/useReducers';
import Loading from '../Loading';
import Button from '../Button';
import * as Styles from './styles';

const OpenWeatherMap = () => {
	const dispatch = useAppDispatch();
	const [openWeatherSearchInput, setOpenWeatherSearchInput] = useState('');
	const locationArray = [
		"Berlin, DE",
		"Seattle, WA, US",
		"Reykjavik, IS",
		"New York, NY, US",
		"London, UK",
		"Wilmington, DE, US",
		"Tokyo, JP",
	];

	const [int, dispatchReducer] = useReducer(incrementReducer, 0);

	let openWeatherMapDataTemp;

	const formatter = new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 1,
		maximumFractionDigits: 1,
	});

	const openWeatherMapData = useAppSelector(openWeatherMapSliceData);

	if(openWeatherMapData && !openWeatherMapData.error) {
		openWeatherMapDataTemp = formatter.format(Number(openWeatherMapData?.main?.temp));
	}

	async function fetchOpenWeather(searchVar: string) {
		if (!validateInput(searchVar)) {
			return dispatch(fetchOpenWeatherMapError())
		}

		await getAddress(searchVar)
			.then((response) => {
				const gc:string | undefined = formatInput(searchVar, false);

				dispatch(fetchOpenWeatherMap({ lat:response.lat, lon:response.lon, gc: gc }))
			})
			.catch(() => {
				dispatch(fetchOpenWeatherMapError())
			});
	};

	useEffect(() => {
		if(locationArray.length > 1) {
			const timer = setInterval(() => {
				if (int >= locationArray.length - 1) {
					dispatchReducer({ type: 'reset' });
				}
				dispatchReducer({ type: 'increment' });
			}, 3500);
			return () => {
				clearInterval(timer);
			};
		}
	}, [int, locationArray.length]);

	useEffect(() => {
		if(openWeatherMapData?.location) {
			setOpenWeatherSearchInput(openWeatherMapData?.location);
		}
	}, [ openWeatherMapData, ]);

	return (
		<div className="container" data-testid="openweathermap-component">
			<Styles.OpenWeathermapContainerBgColor className="flex-column align-items-center mb-5">
				<Styles.OpenWeathermapContainer className="flex-column align-items-center">
					{/* (>>>>>>>>>>>>>>>>>>>>>> LOADING >>>>>>>>>>>>>>>>>>>>>>>>) */}
					{openWeatherMapData?.loading && <Loading text="Loading" />}

					{/* (>>>>>>>>>>>>>>>>>>>>>> LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}
					{!openWeatherMapData?.loading && (
						<>

							<Styles.OpenWeathermapHeader className="mb-1">
								The Exclusive <i>OpenWeather.com</i> forecast {openWeatherMapData?.name && <>for:</>}
							</Styles.OpenWeathermapHeader>

							<div className="mb-1" data-testid="open-weather-data">
								{!openWeatherMapData?.name && openWeatherMapData?.error && (
									<Styles.DataMessageError>Error when attempting to fetch resource.</Styles.DataMessageError>
									)}

								{openWeatherMapData?.name && !openWeatherMapData?.error && (
									<Styles.DataMessageName>{openWeatherMapData.name}</Styles.DataMessageName>
									)}
							</div>

							{openWeatherMapData?.name && !openWeatherMapData?.error && (
								<div className="mb-1"><Styles.DataMessage>{openWeatherMapData?.weather?.main}</Styles.DataMessage>&nbsp;-&nbsp;<Styles.DataMessage>{openWeatherMapData?.weather?.description}</Styles.DataMessage></div>
								)}

							{openWeatherMapData?.name && !openWeatherMapData?.error && (
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
											placeholder={`${locationArray[int]}`}
											data-testid="open-weather-data-form-input"
										/>
										<span><Styles.InputFormat>&#123;city name&#125;,&nbsp;&nbsp;&#123;state code&nbsp;(only for the US)&#125;,&nbsp;&nbsp;&#123;country code&#125;</Styles.InputFormat></span>
									</div>
								</div>
							</div>

							<div data-testid="open-weather-data-form-button">
								<Button
									className="btn-primary btn-md"
									onClick={() => fetchOpenWeather(openWeatherSearchInput)}
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
