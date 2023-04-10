export function validateInput(string: string) {
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
