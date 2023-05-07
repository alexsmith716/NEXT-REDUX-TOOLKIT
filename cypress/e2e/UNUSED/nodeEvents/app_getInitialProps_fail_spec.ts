describe('Mock App.getInitialProps Network Calls', () => {

	context('Verify OpenWeather getAddress Data Fetch Failure', () => {

		beforeEach(() => {
			cy.task('clearNock')
		});
		
		it('cy.get() - assert OpenWeathermap component has failed data', () => {
			cy.visit('/');
			cy.get('[data-testid="open-weather-data"]').eq(0).children().should('not.be.empty');
		});
		
		it('cy.task() - get OpenWeather latLon geocoding values and verify dispatch failure of getAddress()', () => {

			const matchingBody = {
				code: 'ERR_BAD_REQUEST',
				response: {
					status: 401,
					statusText: 'Unauthorized',
					headers: {
						server: 'openresty',
						date: 'Mon, 06 Jun 2022 17:31:37 GMT',
						'content-type': 'application/json; charset=utf-8',
						'content-length': '107',
						connection: 'close',
						'x-cache-key': '/geo/1.0/direct?limit=1&q=new+york,ny,us',
						'access-control-allow-origin': '*',
						'access-control-allow-credentials': 'true',
						'access-control-allow-methods': 'GET, POST'
					},
					data: {
						cod: 401,
						message: 'Invalid API key. Please see http://openweathermap.org/faq#error401 for more info.'
					}
				}
			};

			cy.task('nockGetOpenWeatherMapFail', {
				hostname: 'https://api.openweathermap.org',
				method: 'get',
				geocodePath: `/geo/1.0/direct?q=new+york,ny,us&limit=1&appid=abcd1234`,
				statusCode: 401,
				body: matchingBody
			});

			// nock.scope:api.openweathermap.org query matching succeeded +0ms
			// nock.scope:api.openweathermap.org matching https://api.openweathermap.org:443/geo/1.0/direct to GET https://api.openweathermap.org:443/geo/1.0/direct: true +0ms
			cy.visit('/');
			cy.get('[data-testid="open-weather-data"] > span').eq(0)
				.should(($span) => {
					const className = $span[0].className;
					expect(className).to.match(/styles__DataMessageError/);
				})
				.and('contain', 'Error when attempting to fetch resource.')
		});
	});
});
