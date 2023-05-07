describe('Load OpenWeathermap Success', () => {

	context('Index page - OpenWeathermap Component - Dispatch loadOpenWeathermap() - Success', () => {
		beforeEach(() => {
			cy.visit('/');
		});

		it('cy.window() - verify topmost window object', () => {
			cy.window()
				.should('have.property', 'top');
		});

		it('cy.document() - verify document object character set', () => {
			cy.document()
				.should('have.property', 'charset').and('eq', 'UTF-8');
		});

		it('cy.title() - verify document.title property', () => {
			cy.title()
				.should('include', 'Alex Smith\'s App');
		});

		it('cy.get() - should have __NEXT_DATA__ script', () => {
			cy.get('script#__NEXT_DATA__')
				.should('have.length', 1);
		})

		it('cy.get() - verify OpenWeathermap component', () => {
			cy.get('[data-testid=openweathermap-component]')
				.should("be.visible")
		});

		it('cy.contains() - verify OpenWeathermap component Reload button', () => {
			cy.get('body > div').children().then(($div) => {
				cy.get($div[5]).children().first().find('button')
				cy.contains('Fetch').should('have.class', 'btn-primary btn-md')
			})
		});

		it('cy.click() - cy.wait() - click OpenWeathermap component Reload button and verify successful re-render', () => {
			cy.get('[data-testid=open-weather-data-form-input]')
				.type('Newark, NJ, US')
				.should('have.value', 'Newark, NJ, US')
			cy.get('[data-testid=open-weather-data-form-button] button').first().click()
			cy.wait(3000)
			cy.get('[data-testid=open-weather-data]')
				cy.get('span')
					.contains('Newark')
		});
	});
});
