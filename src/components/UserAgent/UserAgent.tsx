import React from 'react';
import {
  userAgentSliceData,
} from './userAgentSlice';
import { useAppSelector } from '../../redux/store';
import * as Styles from './styles';

const UserAgent = () => {
  const userAgentData = useAppSelector(userAgentSliceData);

	return (
		<div className="container" data-testid="useragent-component">
			<div className="flex-column align-items-center mb-5">
				<Styles.UserAgentStyled className="flex-column align-items-center">

					<Styles.UserAgentUserAgent>{`device 'userAgent' store state is ${userAgentData?.userAgent} !`}</Styles.UserAgentUserAgent>

					<Styles.UserAgentIsBot>{`device 'bot' store state is ${userAgentData?.isBot} !`}</Styles.UserAgentIsBot>

					<Styles.UserAgentBlurb>UserAgentStyled!</Styles.UserAgentBlurb>
				</Styles.UserAgentStyled>
			</div>
		</div>
	);
};

export default UserAgent;
