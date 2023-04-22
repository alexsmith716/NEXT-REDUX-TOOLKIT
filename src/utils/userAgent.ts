export function getUserAgent(ua: string) {
	return /mobile/i.test(ua) ? 'mobile' : 'desktop';
};

export function isDesktop(ua: string) {
	return !/mobile/i.test(ua);
};

export function isMobile(ua: string) {
	return /mobile/i.test(ua);
};

export function getHost(host: string) {
	return host;
};
