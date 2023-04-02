import styled, { keyframes } from 'styled-components';
import Link from 'next/link';

const backgroundColorPalette = keyframes`
	0% {
		background: #006466;
	}

	10% {
		background: #065a60;
	}

	20% {
		background: #0b525b;
	}

	30% {
		background: #144552;
	}

	40% {
		background: #1b3a4b;
	}

	50% {
		background: #212f45;
	}

	60% {
		background: #272640;
	}

	70% {
		background: #312244;
	}

	80% {
		background: #3e1f47;
	}

	90% {
		background: #4d194d;
	}

	100% {
		background: #432534;
	}
`;

export const Masthead = styled.div`
	padding-bottom: 78px;
	text-align: center;
	animation-name: ${backgroundColorPalette};
	animation-duration: 10s;
	animation-iteration-count: infinite;
	animation-direction: alternate;

	@media (min-width: 768px) {
		text-align: left;
	}
`;

export const MastheadHeadingOne = styled.h1`
	font-size: 61px;
	font-weight: 600;
	color: #fff;

	@media (min-width: 768px) {
		font-size: 4.1rem;
	}

	@media (min-width: 992px) {
		font-size: 4.7rem;
	}
`;

export const MastheadHeadingTwo = styled.h2`
	font-size: 2rem;
	color: #eec900;

	@media (min-width: 576px) {
		font-size: 2.3rem;
	}

	@media (min-width: 768px) {
		font-size: 2.3rem;
	}

	@media (min-width: 992px) {
		font-size: 2.5rem;
	}
`;

export const MastheadBlurb = styled.div`
	margin-top: 20px;
	margin-bottom: 5px;
	font-size: 1.2rem;
	color: #ffd39b;

	@media (min-width: 768px) {
		font-size: 1.4rem;
	}

	@media (min-width: 992px) {
		font-size: 1.6rem;
	}
`;

export const MastheadBlurbElipsis = styled(MastheadBlurb)`
	margin-left: 25px;
	margin-bottom: 35px;
`;

export const MastheadButton = styled(Link)`
	font-size: 1.1rem;
`;

export const MastheadLink = styled(Link)`
	text-decoration: none;
`;
