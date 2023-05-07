describe('OpenWeather API Route Endpoint Test Success', () => {
	it('cy.request() - with query parameters', () => {
		cy.request({
			url: 'http://localhost:3000/api/openweathermap',
			qs: {
				lat: 40.7127281,
				lon: -74.0060152,
			},
		})
			.then((res) => {
				expect(res.status).to.eq(200);
				expect(res.body.coord).to.exist;
				expect(res.body.weather).to.exist;
				expect(res.body.name).to.equal('New York');
			})
	})
});
