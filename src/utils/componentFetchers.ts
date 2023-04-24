import axios from 'axios';
import { validateInput } from './cityStateCountryInputValidate';
import { formatInput  } from './cityStateCountryInputFormat';
import { LatLonType, TimeZoneType } from '../types';

// ---------------- OpenWeatherMap -------------------

export async function fetchOpenWeatherMapAddress(geoCode: string) {
	if (!validateInput(geoCode)) {
		return Promise.reject();
	}

	const gc:string | undefined = formatInput(geoCode, true);

	try {
		const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${gc}&limit=1&appid=${process.env.NEXT_PUBLIC_APP_ID}`);
		const ll = {
			lat: response.data[0].lat,
			lon: response.data[0].lon,
			gc: gc,
		};
		return ll;
	} catch (error) {
		return Promise.reject();
	}
};

export async function fetchOpenWeatherMap(latLon: LatLonType) {
	const isServer = typeof window === 'undefined';
	let req: string;

	isServer ? req = `https://api.openweathermap.org/data/2.5/weather?lat=${latLon.lat}&lon=${latLon.lon}&appid=${process.env.NEXT_PUBLIC_APP_ID}&units=imperial` : req = `/api/openweathermap?lat=${latLon.lat}&lon=${latLon.lon}`;

	try {
		const response = await axios.get(req);
		return response.data;
	} catch (error) {
		return Promise.reject();
	};
};

// ---------------- TimeZone -------------------

export async function fetchTimezoneAbstractApi(zone: TimeZoneType) {
	if (!validateInput(zone.gc!)) {

		return Promise.reject();

	} else {
		const isServer = typeof window === 'undefined';
		let req: string;

		isServer ? req = `https://timezone.abstractapi.com/v1/current_time/?api_key=${process.env.NEXT_PUBLIC_APP_ID_B}&location=${zone.gc}` : req = `/api/timezone?location=${zone.gc}`;

		try {
			const response = await axios.get(req);
			return response.data;
		} catch (error) {
			return Promise.reject();
		};
	};
};
