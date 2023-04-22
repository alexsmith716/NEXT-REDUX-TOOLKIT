import React, { useState, useEffect, } from 'react';
import styles from './styles.module.css';

type Props = {
	userAgent: {
		userAgent?: string;
		host?: string;
	}
};

const UserAgent = (props: Props) => {
	const { userAgent } = props;
	const [propsState, setPropsState] = useState(userAgent);

	useEffect(() => {
		if(userAgent) {
			setPropsState(userAgent);
		}
	}, [ userAgent ]);

	return (
		<div className="container" data-testid="useragent-component">
			<div className="flex-column align-items-center mb-5">
				<div className={`flex-column align-items-center ${styles.container}`}>

					<div className={`fontPhilosopherBold ${styles.userAgentUserAgent}`}>{`device 'userAgent' store state is ${propsState?.userAgent}!`}</div>

					<div className={`fontNorwester ${styles.userAgentIsBot}`}>{`device 'userAgent' store state is ${propsState?.host}`}</div>

					<div className={`fontOldEnglish ${styles.blurb}`}>UserAgentStyled!</div>
				</div>
			</div>
		</div>
	);
};

export default UserAgent;
