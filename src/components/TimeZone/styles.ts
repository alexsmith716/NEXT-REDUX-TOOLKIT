import styled from 'styled-components';
import { AppColors } from '../../styled';

export const TimeZoneContainerBgColor = styled.div`
	background-color: #eee5de;
`;

export const TimeZoneContainer = styled.div`
	padding: 16px;
	text-align: center;
`;

export const TimeZoneHeader = styled.div`
	color: #2E2E2E;
	font-family: 'MontserratWebfont', sans-serif;
`;

export const DataMessageError = styled.span`
	color: ${AppColors.colors.crimson};
	font-family: 'RobotoMonoV4LatinRegular', sans-serif;
`;

export const DataMessageName = styled.span`
	color: ${AppColors.colors.blue};
	font-family: 'RobotoMonoV4LatinRegular', sans-serif;
`;

export const DataMessageDate = styled.span`
	color: #8B5742;
	font-family: 'RobotoMonoV4LatinRegular', sans-serif;
	font-weight: 600;
`;

export const DataMessageTime = styled.span`
	color: #C00000;
	font-family: 'RobotoMonoV4LatinRegular', sans-serif;
	font-weight: 600;
`;

export const DataMessageTZ = styled.span`
	color: #00008B;
	font-weight: 500;
`;

export const InputFormat = styled.span`
	font-family: sans-serif;
	font-size: 14px;
	color: #666666;
`;
