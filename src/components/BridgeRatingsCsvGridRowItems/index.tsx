import React, { ReactNode, } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BridgeRatingsSliceData } from '../../redux/slices/bridgeRatingsSlice';

export default function BridgeRatingsCsvGridRowItems(csvTable: BridgeRatingsSliceData) {
	let items:ReactNode[] = [];
	csvTable?.data?.split("\n")?.slice(1)?.map((column: string, index: number) => (
		column.split(",").map((rowItem,) => (
			items.push(
				<div key={uuidv4()} className={`table-bridge-ratings-cell ${index % 2 === 0 ? 'bg-row-color-odd' : 'bg-row-color-even'}`}>
					<div className="table-bridge-ratings-item">{rowItem}</div>
				</div>
			)
		))
	))
	return items;
};
