context('AboutSsr page - Basic Window test', () => {
	beforeEach(() => {
		cy.visit('/aboutssr');
	});

	it('cy.window() - verify topmost window object', () => {
		cy.window().should('have.property', 'top');
	});

	it('cy.document() - verify document object character set', () => {
		cy.document().should('have.property', 'charset').and('eq', 'UTF-8');
	});

	it('cy.title() - verify document.title property', () => {
		cy.title().should('include', 'Alex Smith\'s App');
	});

	it('cy.get() - verify aboutCSVBData success', () => {
		cy.get('[data-cy=posts]').should('not.be.empty')
	});

	//it('cy.get() - verify aboutCSVBData success', () => {
	//	cy.get('[data-cy=posts]').children().first().then(($post) => {
	//		cy.log('aboutCSVBData ======================================: ', $post)
	//	})
	//})
});
