import Home from '../../src/components/Home/Home';
import { NavLinks } from '../../src/components/NavBar/NavLinks';
import { render, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";

const FAKE_TIMER_DELAY = 2500;

beforeEach(() => {
	jest.useFakeTimers();
})

afterEach(() => {
	jest.useRealTimers();
});

describe('Home Component', () => {
	it('Masthead MastheadLink setInterval iterates NavLinks', () => {
		render(<Home />);

		for(let i = 0; i < NavLinks.length; i++) {
			expect(screen.getByTestId('mastheadLink').textContent)
				.toBe(`${NavLinks[i].title}`+String.fromCharCode(160)+String.fromCharCode(62)+String.fromCharCode(62));

			act(() => {
				jest.advanceTimersByTime(FAKE_TIMER_DELAY);
			});
		}
	});

	it('should render all container content', async () => {
		render(<Home />);
		expect(await screen.findByText('Card Title 1')).toBeInTheDocument();
		expect(await screen.findByText('Card Title 2')).toBeInTheDocument();
		expect(await screen.findByText('Card Title 3')).toBeInTheDocument();
	});
});
