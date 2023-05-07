import { NavLinks } from '../../src/components/NavBar/NavLinks';

describe('Verify Basic Functionality of Pages', () => {

	context('Verify Index Page', () => {
		beforeEach(() => {
			cy.visit('/');
		});

		it('cy.window() - Index Page - verify topmost window object', () => {
			cy.window().should('have.property', 'top');
		});

		it('cy.document() - Index Page - verify document object character set', () => {
			cy.document().should('have.property', 'charset').and('eq', 'UTF-8');
		});

		it('cy.title() - Index Page - verify document.title property', () => {
			cy.title().should('include', 'Alex Smith\'s App');
		});

		it('cy.get() - Index Page - should have __NEXT_DATA__ script', () => {
			cy.get('script#__NEXT_DATA__').should('have.length', 1);
		});

		it('cy.get() - Index Page - verify NavBar component', () => {
			cy.get('body > div').children()
				.should(($div) => {
					const className = $div[0].className;
					expect(className).to.match(/styles-navbar__NavBar/);
				})
		});
	});

	context('Verify All NavLinks Pages', () => {
		for(let i = 0; i < NavLinks.length; i++) {
			const linkTitle = NavLinks[i].title.toLowerCase();
			beforeEach(() => {
				cy.visit(`/${linkTitle}`);
			});

			it(`cy.window() - ${linkTitle} - verify topmost window object`, () => {
				cy.window().should('have.property', 'top');
			});

			it(`cy.document() - ${linkTitle} - verify document object character set`, () => {
				cy.document().should('have.property', 'charset').and('eq', 'UTF-8');
			});

			it(`cy.title() - ${linkTitle} - verify document.title property`, () => {
				cy.title().should('include', 'Alex Smith\'s App');
			});

			it(`cy.get() - ${linkTitle} - should have __NEXT_DATA__ script`, () => {
				cy.get('script#__NEXT_DATA__').should('have.length', 1);
			});

			it(`cy.get() - ${linkTitle} - verify NavBar component`, () => {
				cy.get('body > div').children()
					.should(($div) => {
						const className = $div[0].className;
						expect(className).to.match(/styles-navbar__NavBar/);
					})
			});
		}
	});
})
