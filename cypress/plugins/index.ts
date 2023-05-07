import nock from 'nock';

export default async function(on: any, config: any) {
	on('task', {
		log(message: any) {
			console.log(message);
			return null;
		},

		clearNock() {
			nock.restore();
			nock.cleanAll();
			return null;
		},

		async nockGetOpenWeatherMapSuccess({ hostname, geocodePath, weatherDataPath, statusCode, body }: { hostname: any; geocodePath: any; weatherDataPath: any; statusCode: any; body: any }) {
			nock.activate();
			nock(hostname)
				.get(geocodePath)
				.reply(statusCode, body.geocoding)
				.get(weatherDataPath)
				.reply(statusCode, body.weatherData)
			return null;
		},

		async nockGetOpenWeatherMapFail({ hostname, geocodePath, statusCode, body }: { hostname: any; geocodePath: any; statusCode: any; body: any }) {
			nock.activate();
			nock(hostname)
				.get(geocodePath)
				.reply(statusCode, body)
			return null;
		},

		async nockNoReturn({ hostname, path, statusCode, body }: { hostname: any; path: any; statusCode: any; body: any }) {
			nock.activate();
			nock(hostname)
				.get(path)
				.reply(statusCode, body);
			return null;
		},
	});

	return config;
};
