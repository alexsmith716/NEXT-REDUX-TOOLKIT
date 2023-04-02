import React, { useEffect, useState, } from 'react';
import { useRouter } from 'next/router';
import { NavLinks } from './NavLinks';
import * as Styles from './styles-navbar';

import { useReactContext } from '../../styled/ThemeContext';

const NavBar = () => {
	const themeMode = useReactContext();
	const router = useRouter();

	const location = router.pathname;

	const [clicked, setClicked] = useState(false);
	const [activeRoute, setActiveRoute] = useState(location);

	useEffect(() => {
		setActiveRoute(location);
	}, [location]);

	return (
		<Styles.NavBar data-testid="navbar-component">
			<div className="container">
				<Styles.Expand>
					<Styles.NavBarBrandLink href="/" passHref data-testid="navbar-brand-link" onClick={() => setClicked(false)}>
						{activeRoute !== '/' ? 'Home' : null}
					</Styles.NavBarBrandLink>

					<Styles.NavBarNav data-testid="navbar-nav" clicked={clicked} className={clicked ? 'clicked' : ''}>
						<li>
							<Styles.NavBarNavA
								onClick={() => {
									themeMode.toggleTheme();
									setClicked(false);
								}}
							>
								{themeMode.mode === 'dark' ? `Light` : `Dark`}
							</Styles.NavBarNavA>
						</li>

						<li>
							<Styles.NavBarNavA
								onClick={() => {
									window.open('https://github.com/alexsmith716/NEXT-TS-PYTHON', '_blank');
									setClicked(false);
								}}
							>
								Source
							</Styles.NavBarNavA>
						</li>

						{NavLinks.map((item, index) => {
							const a = activeRoute === `/${item.url}`;
							return (
								<li key={index}>
									<Styles.NavBarNavLink href={`/${item.url}`} passHref activelink={a.toString()} onClick={()=> setClicked(false)}>{item.title}</Styles.NavBarNavLink>
								</li>
							);
						})}
					</Styles.NavBarNav>

					<Styles.Toggler onClick={() => setClicked(!clicked)}  data-testid="toggler">
						{clicked && <Styles.StyledSvgTimes fill="#ffffff" />}

						{!clicked && <Styles.StyledSvgBars fill="#ffffff" />}
					</Styles.Toggler>
				</Styles.Expand>
			</div>
		</Styles.NavBar>
	);
};

export default NavBar;
