export function addCurrencyCommas(cost: number) {
	if(cost > 0) {
		return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	} else {
		return '0';
	}
};
