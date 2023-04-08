export function validateOpenWeatherMapInput(string: string) {
	const t = string.trim();
	if (t.length > 100 || t.length < 3 || (t.match(/,/g)||[]).length < 1 || (t.match(/,/g)||[]).length > 2) {
		return false;
	} else {
		const evalArr = t.split(',');
		for (var i = 0; i < evalArr.length; i++) {
			const e = evalArr[i].replace(/\s/g, "")
			if(e === ""){
				return false;
			}
		}
		return true;
	}
};

// https://openweathermap.org/api/geocoding-api
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// q: City name, state code (only for the US) and country code divided by comma. Please use ISO 3166 country codes.

export function formatString(string: string, apiCall: boolean) {
	let first;
	let second;
	let third;
	let location;

	const row:string = string.toLowerCase().trim().replace(/\s\s+/g, ' ');
	const codeArr:string[] = row.split(',');

	for (var i = 0; i < codeArr.length; i++) {
		if(codeArr[0]) {
			first = codeArr[0].trim() 
			first = first.split(" ");
			for (var j = 0; j < first.length; j++) {
				first[j] = first[j][0].toUpperCase() + first[j].substr(1);
			}
			first = first.join(" ");
		}

		codeArr[1] ? second = codeArr[1].trim().toUpperCase() : null;
		codeArr[2] ? third = codeArr[2].trim().toUpperCase() : null;
	}

	if(codeArr[2]) {
		!apiCall ? location = `${first}\u002C\u0020${second}\u002C\u0020${third}` : null;
		apiCall ? location = first+', '+second+', '+third : null;
	} else {
		!apiCall ? location = `${first}\u002C\u0020${second}` : null;
		apiCall ? location = first+', '+second : null;
	}

	return location;
};

export function formatStringTimeZone(string: string,) {
	return string;
};
