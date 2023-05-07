describe('Test Executing code in Node via the task plugin event', () => {

	context('Verify OpenWeathermap Component', () => {

		beforeEach(() => {
			cy.task('log', '>>>>>>> This is beforeEach ++++++++++++')
			cy.task('clearNock')
		});

		afterEach(() => {
			cy.task('log', '>>>>>>> This is afterEach ++++++++++++')
		});

		after(() => {
			cy.task('log', '>>>>>>> This is after ++++++++++++')
		});

		it('cy.get() - assert OpenWeathermap component has successful data', () => {
			cy.visit('/');
			cy.get('[data-testid="open-weather-data"]').eq(0).children().should('not.be.empty');
		});
	});
});
