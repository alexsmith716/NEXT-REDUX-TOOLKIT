import styled from 'styled-components';
import { AppColors } from '../../styled';

export const TimeZoneContainerBgColor = styled.div`
	background-color: #EEEED1;
`;

export const TimeZoneContainer = styled.div`
	padding: 16px;
	text-align: center;
`;

export const TimeZoneContainerStyled = styled.div`
	font-family: 'PhilosopherBold', sans-serif;
`;

export const DataMessageError = styled.span`
	color: ${AppColors.colors.crimson};
	font-family: 'RobotoMonoV4LatinRegular', sans-serif;
`;

export const DataMessageName = styled.span`
	color: ${AppColors.colors.blue};
	font-family: 'RobotoMonoV4LatinRegular', sans-serif;
`;

export const DataMessage = styled.span`
	color: #008B00;
	font-family: 'OpenSansBold', sans-serif;
`;

export const DataMessageTemp = styled.span`
	color: ${AppColors.colors.rutgersScarlet};
	font-family: 'OpenSansBold', sans-serif;
`;

export const InputFormat = styled.span`
	font-family: sans-serif;
	font-size: 14px;
	color: #666666;
`;
