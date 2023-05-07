describe('Navbar Desktop and Mobile Responsive Media Queries', () => {

	context('Verify Functionality of Index Page', () => {
		beforeEach(() => {
			cy.visit('/');
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

		it('should have __NEXT_DATA__ script', () => {
			cy.get('script#__NEXT_DATA__').should('have.length', 1);
		});

		it('cy.get() - verify NavBar component', () => {
			cy.get('body > div').children()
				.should(($div) => {
					const className = $div[0].className;
					expect(className).to.match(/styles-navbar__NavBar/);
				})
		});
	});

	context('Desktop', () => {
		beforeEach(() => {
			cy.visit('http://localhost:3000/');
			cy.viewport(1280, 720)
		});

		it('cy.get() - NavBar NavBarNav is visible', () => {
			cy.get('[data-testid=navbar-nav]').should('be.visible');
		});

		it('cy.get() - NavBar Toggler is not visible', () => {
			cy.get('[data-testid="toggler"]').should('not.be.visible');
		});
	});

	context('Mobile and Tablet', () => {
		beforeEach(() => {
			cy.visit('/');
			cy.viewport(992, 720)
		});

		it('cy.get() - NavBar NavBarNav is not visible', () => {
			cy.get('[data-testid=navbar-nav]').should('not.be.visible');
		});

		it('cy.get() - NavBar Toggler is visible', () => {
			cy.get('[data-testid="toggler"]').should('be.visible');
		});

		it('cy.get() - NavBar Toggler is StyledSvgBars', () => {
			cy.get('[data-testid="toggler"]').find('svg').should((svg) => {
				const className = svg.attr('class');
				expect(className).to.match(/styles-navbar__StyledSvgBars/);
			})
		});

		it('cy.click() - NavBar click Toggler StyledSvgBars and NavBarNav is visible', () => {
			cy.get('[data-testid="toggler"]').click()
			cy.get('[data-testid=navbar-nav]').should('be.visible');
		})
	})
})
