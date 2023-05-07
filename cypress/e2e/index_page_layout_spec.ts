context('Index page - Any page Basic Window test', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('cy.window() - verify topmost window object', () => {
		cy.window()
			.should('have.property', 'top');
	});

	it('cy.document() - verify document object character set', () => {
		cy.document()
			.should('have.property', 'charset')
			.and('eq', 'UTF-8');
	});

	it('cy.title() - verify document.title property', () => {
		cy.title()
			.should('include', 'Alex Smith\'s App');
	});

	it('should have __NEXT_DATA__ script', () => {
		cy.get('script#__NEXT_DATA__')
			.should('have.length', 1);
	})

	it('cy.get() - verify NavBar component', () => {
		cy.get('[data-testid=navbar-component]')
			.should("be.visible")
	});

	it('cy.get() - verify Home component', () => {
		cy.get('[data-testid=home-component]')
			.should("be.visible")
	});

	it('cy.get() - verify DatePicker component', () => {
		cy.get('[data-testid=datepicker-component]')
			.should("be.visible")
	});

	it('cy.get() - verify OpenWeathermap component', () => {
		cy.get('[data-testid=openweathermap-component]')
			.should("be.visible")
	});

	it('cy.get() - verify UserAgent component', () => {
		cy.get('[data-testid=useragent-component]')
			.should("be.visible")
	});

	it('cy.get() - verify DateNow component', () => {
		cy.get('[data-testid=datenow-component]')
			.should("be.visible")
	});

	it('cy.get() - verify Footer component', () => {
		cy.get('[data-testid=footer-component]')
			.should("be.visible")
	});
});
