import React, { useState, useEffect, useReducer } from 'react';
import {
	fetchTimeZoneError,
	fetchTimeZone,
	timeZoneSliceData,
} from '../../redux/slices/timeZoneSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { validateInput } from '../../utils/cityStateCountryInputValidate';
import { formatInput  } from '../../utils/cityStateCountryInputFormat';
import { incrementReducer } from '../../utils/useReducers';
import Loading from '../Loading';
import Button from '../Button';
import * as Styles from './styles';

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

	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	// any, number, bigint, enum
	function getFormattedDate(datetime: string) {
		const datetimeR = datetime.split(" ")[0].replace(/-0+/g, '-');
		const datetimeArr = datetimeR.split("-");
		const tzYear = Number(datetimeArr[0]);
		const tzMonth = months[Number(datetimeArr[1])-1];
		const tzDay = datetimeArr[2];
		const d = `${tzMonth}\u0020${tzDay}\u002C\u0020${tzYear}`;
		return d;
	};

	function getFormattedTime(datetime: string) {
		const datetimeArr = datetime.split(" ")[1].split(':');
		const hour = Number(datetimeArr[0]);
		const minute = Number(datetimeArr[1]);
		const second = Number(datetimeArr[2]);
		let formattedTime;

		if (hour > 0 && hour <= 12) {
			formattedTime = hour;
		} else if (hour > 12) {
			formattedTime = (hour - 12);
		} else if (hour == 0) {
			formattedTime = '12';
		}

		formattedTime += (minute < 10) ? ':0' + minute : ':' + minute;
		formattedTime += (second < 10) ? ':0' + second : ':' + second;
		formattedTime += (hour >= 12) ? '\u0020PM' : '\u0020AM';

		return formattedTime;
	};

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
						<>

							<Styles.TimeZoneHeader className="mb-1">
								The Exclusive <i>Abstractapi.com</i> time {timeZoneData?.datetime && <>for:</>}
							</Styles.TimeZoneHeader>

							<div  className="mb-1" data-testid="timezone-data">
								{!timeZoneData?.datetime && timeZoneData?.error && (
									<Styles.DataMessageError>Error when attempting to fetch resource.</Styles.DataMessageError>
									)}

								{timeZoneData?.datetime && !timeZoneData?.error && (
									<Styles.DataMessageName>{timeZoneData.requested_location}</Styles.DataMessageName>
									)}
							</div>

							{timeZoneData?.datetime && !timeZoneData?.error && (
								<div className="mb-1"><Styles.DataMessageDate>{getFormattedDate(timeZoneData.datetime)}</Styles.DataMessageDate></div>
								)}

							{timeZoneData?.datetime && !timeZoneData?.error && (
								<div className="mb-1"><Styles.DataMessageTime>{getFormattedTime(timeZoneData.datetime)}</Styles.DataMessageTime></div>
								)}

							{timeZoneData?.datetime && !timeZoneData?.error && (
								<div><Styles.DataMessageTZ>{timeZoneData.timezone_name}</Styles.DataMessageTZ>&nbsp;-&nbsp;<Styles.DataMessageTZ>{timeZoneData.timezone_abbreviation}</Styles.DataMessageTZ></div>
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

						</>
					)}

				</Styles.TimeZoneContainer>
			</Styles.TimeZoneContainerBgColor>
		</div>
	);
};

export default TimeZone;
