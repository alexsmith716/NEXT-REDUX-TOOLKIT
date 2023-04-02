import { CurrencyCommasType } from '../types';

export function addCurrencyCommas(cost: CurrencyCommasType) {
	if(cost?.data) {
		if(cost?.data > 0) {
			return cost?.data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		} else {
			return '0';
		}
	}
};
