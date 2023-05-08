import axios from 'axios';
import { getAddress } from '../../src/redux/reducers/openWeathermapSlice';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const gc = 'boston,ma,us';
const URL = `https://api.openweathermap.org/geo/1.0/direct?q=${gc}&limit=1&appid=${process.env.NEXT_PUBLIC_APP_ID}`;

const response = {
	"data": [
		{
			"name": "Boston",
			"local_names": {
				"en": "Boston",
			},
			"lat": 42.3602534,
			"lon": -71.0582912,
			"country": "US",
			"state": "Massachusetts"
		}
	]
};

describe('function getAddress() fetch geo latitude and longitude', () => {
	describe('when getAddress() API call is successful', () => {

		it('should return the location latitude and longitude', async () => {

			mockedAxios.get.mockResolvedValueOnce(response);

			const result = await getAddress(gc);

			const ll = {
				lat:response.data[0].lat,
				lon:response.data[0].lon,
			};

			expect(await axios.get).toHaveBeenCalledWith(`${URL}`);
			expect(await result).toEqual(ll);
		});
	});
});
