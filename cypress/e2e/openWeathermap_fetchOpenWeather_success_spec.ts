context('OpenWeathermap fetchOpenWeather Success Network Request', () => {

	beforeEach(() => {
		cy.visit('/');

		cy.get('[data-testid=open-weather-data-form-input]').type('boston, ma, us')

		cy.intercept('GET', '/api/openweathermap?lat=42.3602534&lon=-71.0582912', {
			fixture: 'openWeather.json'
		}).as('getOpenWeather')

		cy.get('div[data-testid=open-weather-data-form-button]').find('button').contains('Fetch').click()

		cy.wait('@getOpenWeather')
			.its('response.body')
			.should('have.property', 'id')
			.and('equal', 4930956)
	})
});
