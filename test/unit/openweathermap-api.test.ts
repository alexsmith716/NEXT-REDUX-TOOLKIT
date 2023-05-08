/**
 * @jest-environment node
 */

import nock from 'nock';
import axios from 'axios';
import { LatLonType } from '../../src/types';

//if(typeof process != 'undefined'){
//  axios.defaults.adapter = require('axios/lib/adapters/http');
//}

const latLon = {
	lat: 42.3602534,
	lon: -71.0582912
};

const responseMock = {
	status: 200,
	statusText: 'OK',
	data: {
		coord: { lon: -71.0583, lat: 42.3603 },
		timezone: -14400,
		id: 4930956,
		name: 'Boston',
		cod: 200
	}
};

async function handler(latLon: LatLonType) {
	let lat = latLon.lat;
	let lon = latLon.lon;

	const res = await axios(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_APP_ID}&units=imperial`);
	return res.data;
};

describe('Pages API openweathermap handler successfully fetches weather data', () => {
	it('confirms api.openweathermap request equals mocked response', async () => {
		nock('https://api.openweathermap.org')
			.get(`/data/2.5/weather?lat=${latLon.lat}&lon=${latLon.lon}&appid=${process.env.NEXT_PUBLIC_APP_ID}&units=imperial`)
			.reply(200, responseMock);
		const results = await handler(latLon);
		expect(await results.data.id).toEqual(4930956);
	});
});
