import formatString from '../../src/utils/openWeatherSearchInputStringFormat';

const searchVar = '      san   luis   obispo  ,   ca  ,  us    ';
const geoCode = '      san   luis   obispo  ,   ca  ,  us    ';

describe('OpenWeather Search Input String Format Module', () => {
	it('correctly formats for OpenWeathermap function fetchOpenWeather()', async () => {
		const result = formatString(searchVar, false);
		const expected = 'san luis obispo, ca, us';
		expect(await result).toBe(expected);
	});

	it('correctly formats for openWeathermapSlice function getAddress()', async () => {
		const result = formatString(geoCode, true);
		const expected = 'san+luis+obispo,ca,us';
		expect(await result).toBe(expected);
	});
});
