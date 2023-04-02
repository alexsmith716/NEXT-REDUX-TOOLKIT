import styled from 'styled-components';
import { colors } from '../styled/Colors';

export const Thumbnail = styled.div`
	display: flex;
	justify-content: center;

	//@media screen and (max-width: 992px) {
	//	justify-content: flex-start;
	//}
`;

export const ThumbnailImage = styled.img`
	width: 300px;
	height: auto;

	//@media screen and (max-width: 992px) {
	//	width: auto;
	//}
`;

export const AboutStyled = styled.div`
	background-color: ${colors.lightskyblue};
`;

export const SubContainer = styled.div`
	background-color: ${colors.lightskyblue};
`;

export const AboutImageMain = styled.img`
	src: ${(props) => props.src};
	alt: ${(props) => props.alt};
`;

export const AboutImageOurCustomers = styled.img`
	src: ${(props) => props.src};
	alt: ${(props) => props.alt};
`;
