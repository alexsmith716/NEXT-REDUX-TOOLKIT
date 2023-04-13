import React from 'react';
import {
	userAgentSliceData,
} from './userAgentSlice';
import { useAppSelector } from '../../redux/store';
import styles from './styles.module.css';

const UserAgent = () => {
	const userAgentData = useAppSelector(userAgentSliceData);

	return (
		<div className="container-global" data-testid="useragent-component">
			<div className="flex-column-global align-items-center-global mb-5-global">
				<div className={`flex-column-global align-items-center-global ${styles.container}`}>

					<div className={`fontPhilosopherBold ${styles.userAgentUserAgent}`}>{`device 'userAgent' store state is ${userAgentData?.userAgent}!`}</div>

					<div className={`fontNorwester ${styles.userAgentIsBot}`}>{`device 'bot' store state is ${userAgentData?.isBot}!`}</div>

					<div className={`fontOldEnglish ${styles.blurb}`}>UserAgentStyled!</div>
				</div>
			</div>
		</div>
	);
};

export default UserAgent;
