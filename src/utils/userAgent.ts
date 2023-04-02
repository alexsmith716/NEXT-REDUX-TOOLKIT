export function getUserAgent(ua: string) {
	return /mobile/i.test(ua) ? 'mobile' : 'desktop';
};

export function isDesktop(ua: string) {
	return !/mobile/i.test(ua);
};

export function isMobile(ua: string) {
	return /mobile/i.test(ua);
};

export function isBot(ua: string) {
	const b =
		/curl|bot|googlebot|google|baidu|bing|msn|duckduckgo|teoma|slurp|yandex|crawler|spider|robot|crawling/i;
	return !b.test(ua) ? 'false' : 'true';
};
