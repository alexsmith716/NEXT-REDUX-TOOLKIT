import React, { useState, } from 'react';

import { fetchTimezoneAbstractApi } from '../../utils/componentFetchers';
import { validateInput } from '../../utils/cityStateCountryInputValidate';
import { formatInput  } from '../../utils/cityStateCountryInputFormat';

import Loading from '../Loading';
import Button from '../Button';
import { TimeZoneData } from '../../types';
import * as Styles from './styles';


const TimeZone = () => {
	const [timeZoneDataLoading, setTimeZoneDataLoading] = useState(false);
	const [timeZoneDataError, setTimeZoneDataError] = useState(false);
	const [timeZoneSearchInput, setTimeZoneSearchInput] = useState('');

	const [timeZoneData, setTimeZoneData] = useState<TimeZoneData|null>(null);

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

	function setLoading() {
		setTimeZoneDataLoading(true);
		setTimeZoneDataError(false);
		setTimeZoneData(null);
	};

	function setLoaded() {
		setTimeZoneDataLoading(false);
		setTimeZoneDataError(false);
	};

	function setError() {
		setTimeZoneDataLoading(false);
		setTimeZoneDataError(true);
	};

	async function fetchTheZone(searchVar: string) {
		setLoading();

		if (!validateInput(searchVar)) {
			setError();
			return;
		}

		const gc:string | undefined = formatInput(searchVar, false);
		setTimeZoneSearchInput(gc as string);

		await fetchTimezoneAbstractApi({ gc: gc })
			.then((response) => {
				setLoaded();
				setTimeZoneData(response);
			})
			.catch(() => {
				setError();
			});
	};

	return (
		<div className="container" data-testid="timezone-component">
			<Styles.TimeZoneContainerBgColor className="flex-column align-items-center mb-5">
				<Styles.TimeZoneContainer className="flex-column align-items-center">
					{/* (>>>>>>>>>>>>>>>>>>>>>> LOADING >>>>>>>>>>>>>>>>>>>>>>>>) */}
					{timeZoneDataLoading && <Loading text="Loading" />}

					{/* (>>>>>>>>>>>>>>>>>>>>>> LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}
					{!timeZoneDataLoading && (
						<>

							<Styles.TimeZoneHeader className="mb-1">
								The Exclusive <i>Abstractapi.com</i> time {timeZoneData && !timeZoneDataError && <>for:</>}
							</Styles.TimeZoneHeader>

							<div  className="mb-1" data-testid="timezone-data">
								{!timeZoneData && timeZoneDataError && (
									<Styles.DataMessageError>Error when attempting to fetch resource.</Styles.DataMessageError>
									)}

								{timeZoneData && !timeZoneDataError && (
									<Styles.DataMessageName>{timeZoneData.requested_location}</Styles.DataMessageName>
									)}
							</div>

							{timeZoneData && !timeZoneDataError && (
								<div className="mb-1"><Styles.DataMessageDate>{getFormattedDate(timeZoneData.datetime)}</Styles.DataMessageDate></div>
								)}

							{timeZoneData && !timeZoneDataError && (
								<div className="mb-1"><Styles.DataMessageTime>{getFormattedTime(timeZoneData.datetime)}</Styles.DataMessageTime></div>
								)}

							{timeZoneData && !timeZoneDataError && (
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
											//placeholder={`${locationArray[int]}`}
											data-testid="timezone-data-form-input"
										/>
										<span><Styles.InputFormat>&#123;city name&#125;,&nbsp;&nbsp;&#123;state code&nbsp;(only for the US)&#125;,&nbsp;&nbsp;&#123;country code&#125;</Styles.InputFormat></span>
									</div>
								</div>
							</div>

							<div className="mt-2">
								<Button
									className="btn-primary btn-md"
									onClick={() => fetchTheZone(timeZoneSearchInput)}
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
