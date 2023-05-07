describe('Mock App.getInitialProps Network Calls', () => {

	context('Verify OpenWeather loadOpenWeathermap Data Fetch', () => {

		beforeEach(() => {
			cy.task('clearNock')
		});
		
		it('cy.get() - assert OpenWeathermap component has successful data', () => {
			cy.visit('/');
			cy.get('[data-testid="open-weather-data"]').eq(0).children().should('not.be.empty');
		});
		
		it('cy.task() - get OpenWeather latLon geocoding values and verify dispatch success of loadOpenWeathermap()', () => {
			const latitude = 40.7127281;
			const longitude = -74.0060152;

			const matchingBody = {
				geocoding:[{
					name: "New York",
					lat: latitude,
					lon: longitude,
					country: "US",
					state: "New York"
				}],
				weatherData: {
					coord: { lon: -74.006, lat: 40.7128 },
					weather: [
						{
							id: 802,
							main: 'Clouds',
							description: 'scattered clouds',
							icon: '03d'
						}
					],
					base: 'stations',
					main: {
						temp: 67.32,
						feels_like: 66.7,
						temp_min: 62.94,
						temp_max: 72.28,
						pressure: 1026,
						humidity: 63
					},
					visibility: 10000,
					wind: { speed: 12.66, deg: 170 },
					clouds: { all: 40 },
					dt: 1653581573,
					sys: {
						type: 2,
						id: 2039034,
						country: 'US',
						sunrise: 1653557427,
						sunset: 1653610562
					},
					timezone: -14400,
					id: 5128581,
					name: 'New York',
					cod: 200
				}
			};

			cy.task('nockGetOpenWeatherMapSuccess', {
				hostname: 'https://api.openweathermap.org',
				method: 'get',
				geocodePath: `/geo/1.0/direct?q=new+york,ny,us&limit=1&appid=${Cypress.env('APP_ID')}`,
				weatherDataPath: `/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${Cypress.env('APP_ID')}&units=imperial`,
				statusCode: 200,
				body: matchingBody
			});

			// nock.scope:api.openweathermap.org query matching succeeded +1ms
			// nock.scope:api.openweathermap.org matching https://api.openweathermap.org:443/geo/1.0/direct to GET https://api.openweathermap.org:443/geo/1.0/direct: true +0ms

			// nock.scope:api.openweathermap.org query matching succeeded +1ms
			// nock.scope:api.openweathermap.org matching https://api.openweathermap.org:443/data/2.5/weather to GET https://api.openweathermap.org:443/data/2.5/weather: true +0ms
			cy.visit('/');
			cy.get('[data-testid="open-weather-data"] > span').eq(0)
				.should(($span) => {
					const className = $span[0].className;
					expect(className).to.match(/styles__DataMessageName/);
				})
				.and('contain', matchingBody.weatherData.name)
		});
	});
});
