export default function formatString(string: string, apiCall: boolean) {
	const row:string = string.toLowerCase().trim().replace(/\s\s+/g, ' ');
	const s:string[] = row.split(',');
	const cn:string = !apiCall ? s[0].replace(/\s/g, ' ') : s[0].trim().replace(/\s/g, '+');

	const cityName:string = (`${cn}`).trim();
	const stateCode:string = (s[1]).trim();
	const countryCode:string = s[2] !== undefined ? `\u002C${s[2]}` : '';

	if(!apiCall) {
		return `${cityName}\u002C\u0020${stateCode}${countryCode}`;
	}

	if(apiCall) {
		return (cityName+','+stateCode+countryCode).replace(/\s/g, '');
	}
}
