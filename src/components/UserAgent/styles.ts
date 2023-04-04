import styled from 'styled-components';
import { AppColors } from '../../styled';

export const UserAgentStyled = styled.div`
	background-color: #fffff0;
	border: 2px solid #b0c4de;
	padding: 16px;
`;

export const UserAgentOnline = styled.div`
	color: ${AppColors.colors.olive};
	font-family: 'OpenSansBold', sans-serif;
`;

export const UserAgentUserAgent = styled.div`
	color: ${AppColors.colors.crimson};
	font-family: 'PhilosopherBold', sans-serif;
`;

export const UserAgentIsBot = styled.div`
	color: ${AppColors.colors.orangered};
	font-family: 'Norwester', sans-serif;
`;

export const UserAgentBlurb = styled.div`
	color: ${AppColors.colors.mediumspringgreen};
	font-family: 'OldEnglish', sans-serif;
`;
