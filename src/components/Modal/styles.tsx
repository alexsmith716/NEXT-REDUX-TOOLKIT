import styled from 'styled-components';

export const ModalMain = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	width: 100%;
	overflow-y: auto;
	outline: 0;
	padding-top: 48px;
`;

export const ModalDialog = styled.div`
	position: relative;
	margin: 0.5rem;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	pointer-events: none;
	align-items: center;
	justify-content: center;
	min-height: calc(100% - (0.5rem * 2));
	z-index: 10000;
`;

export const ModalContent = styled.div`
	position: relative;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;

	flex-direction: column;
	max-width: 768px;
	pointer-events: auto;
	border: 1px solid black;
	box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
	box-sizing: border-box;
	background-color: #404040;
	outline: 0;
`;

export const Screen = styled.div`
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	z-index: 9999;
	background-color: rgba(0, 0, 0, 0.2);
`;
