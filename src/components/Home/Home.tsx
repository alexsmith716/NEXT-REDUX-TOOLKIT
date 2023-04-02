import React, { useEffect, useReducer } from 'react';
import { NavLinks } from '../../components/NavBar/NavLinks';
import * as Styles from './styles';

const reducer = (int: number, action: { [key: string]: string }) => {
	if (int >= NavLinks.length - 1) {
		int = -1;
	}
	switch (action.type) {
		case 'incrementNavLink':
			return int + 1;
		default:
			return int;
	}
};

export default function Home() {
	const [int, dispatch] = useReducer(reducer, 0);

	useEffect(() => {
		const timer = setInterval(() => {
			dispatch({ type: 'incrementNavLink' });
		}, 2500);
		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div data-testid="home-component">
			<Styles.Masthead className="mb-5">
				<div className="container">
					<Styles.MastheadHeadingOne>Alex Smith&apos;s App</Styles.MastheadHeadingOne>

					<Styles.MastheadHeadingTwo>My Full Stack Developer Portfolio</Styles.MastheadHeadingTwo>

					<Styles.MastheadBlurb>Interested in challenging JS and TS?</Styles.MastheadBlurb>

					<Styles.MastheadBlurbElipsis>
						... check out samples of my work.
					</Styles.MastheadBlurbElipsis>

					<Styles.MastheadLink href={`/${NavLinks[int].url}`} passHref className="btn btn-lg btn-success" data-testid="mastheadLink">{`${NavLinks[int].title}`}&nbsp;&gt;&gt;</Styles.MastheadLink>

				</div>
			</Styles.Masthead>

			{/* ---------------------------------------------- */}
			<div className="container">
				<div className={`mb-5 card-container-grid`}>
					<div className="container-padding-border-radius-2">
						<div>
							<h4>Card Title 1</h4>
							<div>
								<p>
									Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac
									cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo
									sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed
									odio dui.
								</p>
							</div>
							<div>
								<a href="#">More Info</a>
							</div>
						</div>
					</div>

					<div className="container-padding-border-radius-2">
						<div>
							<h4>Card Title 2</h4>
							<div>
								<p>
									Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac
									cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo
									sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed
									odio dui.
								</p>
							</div>
							<div>
								<a href="#">More Info</a>
							</div>
						</div>
					</div>

					<div className="container-padding-border-radius-2">
						<div>
							<h4>Card Title 3</h4>
							<div>
								<p>
									Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac
									cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo
									sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed
									odio dui.
								</p>
							</div>
							<div>
								<a href="#">More Info</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
