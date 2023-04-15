import React, { ReactNode, } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BridgeRatingsSliceData } from '../../redux/slices/bridgeRatingsSlice';

export default function BridgeRatingsCsvGridColumnHeader(csvTable: BridgeRatingsSliceData) {
	let items:ReactNode[] = [];
	csvTable?.data?.split("\n")?.shift()?.split(",")?.map((columnHeader: string) => (
		items.push(
			<div key={uuidv4()} className="table-bridge-ratings-cell table-bridge-ratings-column-header">
				<div className="table-bridge-ratings-item">{columnHeader}</div>
			</div>
		)
	))
	return items;
};
