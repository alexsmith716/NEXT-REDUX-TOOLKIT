import React, { useState, useEffect, useReducer } from 'react';
import {
	fetchTimeZoneError,
	fetchTimeZone,
	timeZoneSliceData,
} from './timeZoneSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { validateInput } from '../../utils/cityStateCountryInputValidate';
import { formatInput  } from '../../utils/cityStateCountryInputFormat';
import { incrementReducer } from '../../utils/useReducers';
import Loading from '../Loading';
import Button from '../Button';
import * as Styles from './styles';

//  {
//    "datetime": "2023-04-04 22:14:37",
//    "timezone_name": "British Summer Time",
//    "timezone_location": "Europe/London",
//    "timezone_abbreviation": "BST",
//    "gmt_offset": 1,
//    "is_dst": true,
//    "requested_location": "Oxford, United Kingdom",
//    "latitude": 51.7520131,
//    "longitude": -1.2578499
//  }

const TimeZone = () => {
	const dispatch = useAppDispatch();
	const [timeZoneSearchInput, setTimeZoneSearchInput] = useState('');
	const timeZoneData = useAppSelector(timeZoneSliceData);
	const locationArray = [
		"Eastport, ME, US",
		"Pretoria, ZA",
		"Steamboat Springs, CO, US",
		"Mumbai, IN",
		"Pearl City, HI, US",
		"Hervey Bay, AU",
		"Kaktovik, AK, US",
	];

	const [int, dispatchReducer] = useReducer(incrementReducer, 0);

	//const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	useEffect(() => {
		if(timeZoneData.datetime){
			//console.log('>>>>>> timeZoneData: ', timeZoneData)
		}
	}, [ timeZoneData ]);

	async function fetchTimeZoneData(searchVar: string) {
		if (!validateInput(searchVar)) {
			return dispatch(fetchTimeZoneError())
		}
		const gc:string | undefined = formatInput(searchVar, false);
		dispatch(fetchTimeZone({ gc: gc }))
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
		if(timeZoneData?.location) {
			setTimeZoneSearchInput(timeZoneData?.location);
		}
	}, [ timeZoneData, ]);

	return (
		<div className="container" data-testid="timezone-component">
			<Styles.TimeZoneContainerBgColor className="flex-column align-items-center mb-5">
				<Styles.TimeZoneContainer className="flex-column align-items-center">
					{/* (>>>>>>>>>>>>>>>>>>>>>> LOADING >>>>>>>>>>>>>>>>>>>>>>>>) */}
					{timeZoneData?.loading && <Loading text="Loading" />}

					{/* (>>>>>>>>>>>>>>>>>>>>>> LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}
					{!timeZoneData?.loading && (
						<Styles.TimeZoneContainerStyled>

							<div className="mb-2">
								The Exclusive <i>Abstractapi.com</i>&nbsp;timezone {timeZoneData?.datetime && <>&nbsp;for:</>}
							</div>

							<div data-testid="timezone-data">
								{!timeZoneData?.datetime && timeZoneData?.error && (
									<Styles.DataMessageError>Error when attempting to fetch resource.</Styles.DataMessageError>
									)}

								{timeZoneData?.datetime && !timeZoneData?.error && (
									<Styles.DataMessageName>{timeZoneData.requested_location}</Styles.DataMessageName>
									)}
							</div>

							{timeZoneData?.datetime && !timeZoneData?.error && (
								<div><Styles.DataMessage>{timeZoneData.timezone_name}</Styles.DataMessage>&nbsp;-&nbsp;<Styles.DataMessage>{timeZoneData.timezone_abbreviation}</Styles.DataMessage></div>
								)}

							{timeZoneData?.datetime && !timeZoneData?.error && (
								<div><Styles.DataMessageTemp>{timeZoneData.datetime}</Styles.DataMessageTemp></div>
								)}

							<div className="mt-2 mb-3">
								<div className="display-flex justify-content-center">
									<div>
										<input
											type="text"
											className="form-control"
											name="timeZoneSearchInput"
											value={timeZoneSearchInput}
											onChange={(e) => setTimeZoneSearchInput(e.target.value)}
											placeholder={`${locationArray[int]}`}
											data-testid="timezone-data-form-input"
										/>
										<span><Styles.InputFormat>&#123;city name&#125;,&nbsp;&nbsp;&#123;state code&nbsp;(only for the US)&#125;,&nbsp;&nbsp;&#123;country code&#125;</Styles.InputFormat></span>
									</div>
								</div>
							</div>

							<div className="mt-2">
								<Button
									className="btn-primary btn-md"
									onClick={() => fetchTimeZoneData(timeZoneSearchInput)}
									buttonText="Fetch"
								/>
							</div>

						</Styles.TimeZoneContainerStyled>
					)}

				</Styles.TimeZoneContainer>
			</Styles.TimeZoneContainerBgColor>
		</div>
	);
};

export default TimeZone;
