import React, { useState, } from 'react';
import {
	getAddress,
	fetchOpenWeatherMapError,
	fetchOpenWeatherMap,
	openWeatherMapSliceData,
} from './openWeatherMapSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { formatString } from '../../utils/openWeatherSearchInputStringFormat';
import Loading from '../Loading';
import Button from '../Button';
import * as Styles from './styles';

const OpenWeatherMap = () => {
	const dispatch = useAppDispatch();
	const [openWeatherSearchInput, setOpenWeatherSearchInput] = useState('');

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
		if (searchVar.length < 1 || searchVar.length > 100 || (searchVar.match(/,/g)||[]).length < 2) {
			return dispatch(fetchOpenWeatherMapError())
		}

		await getAddress(searchVar)
			.then((response) => {
				setOpenWeatherSearchInput(formatString(searchVar, false));

				dispatch(fetchOpenWeatherMap({ lat:response.lat, lon:response.lon }))
			})
			.catch(() => {
				dispatch(fetchOpenWeatherMapError())
			});
	};

	return (
		<div className="container" data-testid="openweathermap-component">
			<Styles.OpenWeathermapContainerBgColor className="flex-column align-items-center mb-5">
				<Styles.OpenWeathermapContainer className="flex-column align-items-center">
					{/* (>>>>>>>>>>>>>>>>>>>>>> LOADING >>>>>>>>>>>>>>>>>>>>>>>>) */}
					{openWeatherMapData?.loading && <Loading text="Loading" />}

					{/* (>>>>>>>>>>>>>>>>>>>>>> LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}
					{!openWeatherMapData?.loading && (
						<Styles.OpenWeathermapContainerStyled>
							<div className="mb-2">
								The Exclusive <i>OpenWeather.com</i>&nbsp;forecast{openWeatherMapData?.name && <>&nbsp;for:</>}
							</div>

							<div data-testid="open-weather-data">
								{!openWeatherMapData?.name && openWeatherMapData?.error && (
									<Styles.DataMessageError>Error when attempting to fetch resource.</Styles.DataMessageError>
									)}

								{openWeatherMapData?.name && !openWeatherMapData?.error && (
									<Styles.DataMessageName>{openWeatherMapData.name}</Styles.DataMessageName>
									)}
							</div>

							{openWeatherMapData?.name && !openWeatherMapData?.error && (
								<div><Styles.DataMessage>{openWeatherMapData?.weather?.main}</Styles.DataMessage>&nbsp;-&nbsp;<Styles.DataMessage>{openWeatherMapData?.weather?.description}</Styles.DataMessage></div>
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
											placeholder="New York, NY, US"
											data-testid="open-weather-data-form-input"
										/>
										<span><Styles.InputFormat>&#123;city name&#125;,&nbsp;&nbsp;&#123;state code&#125;,&nbsp;&nbsp;&#123;country code&#125;</Styles.InputFormat></span>
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
						</Styles.OpenWeathermapContainerStyled>
					)}
				</Styles.OpenWeathermapContainer>
			</Styles.OpenWeathermapContainerBgColor>
		</div>
	);
};

export default OpenWeatherMap;
