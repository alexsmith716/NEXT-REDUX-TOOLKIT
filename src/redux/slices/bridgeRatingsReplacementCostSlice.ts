import { createSlice, createSelector, PayloadAction, } from '@reduxjs/toolkit';
import { AppState, AppThunk } from '../../redux/store';
import { fetchData } from '../../utils/fetchAPI';

export interface BridgeRatingsReplacementCostSliceData {
	loading: boolean;
	error: boolean;
	data?: number | null;
};

interface BridgeRatingsReplacementCostSliceState {
	data: BridgeRatingsReplacementCostSliceData;
};

const bridgeRatingsReplacementCostSliceInitialState: BridgeRatingsReplacementCostSliceState = {
	data: {
		loading: false,
		error: false,
		data: null,
	}
};

export const bridgeRatingsReplacementCostSlice = createSlice({
	name: 'bridgeRatingsReplacementCost',
	initialState: bridgeRatingsReplacementCostSliceInitialState,
	reducers: {
		sliceLoading(state, {payload}: PayloadAction<BridgeRatingsReplacementCostSliceState>) {
			return {
				...state,
				...payload,
			}
		},
		sliceLoaded(state, {payload}: PayloadAction<BridgeRatingsReplacementCostSliceState>) {
			return {
				...state,
				...payload,
			}
		},
		sliceFailed(state, {payload}: PayloadAction<BridgeRatingsReplacementCostSliceState>) {
			return {
				...state,
				...payload,
			}
		},
	},
});

// ==========================================================

export const fetchBridgeRatingsReplacementCost = (): AppThunk => async (dispatch,) => {
	dispatch(
		bridgeRatingsReplacementCostSlice.actions.sliceLoading({
			data: {
				loading: true,
				error: false,
			},
		}),
	);

	try {
		const response = await fetchData('botosssgetobject/brooklynbridgesreplacementcost');
	
		dispatch(
			bridgeRatingsReplacementCostSlice.actions.sliceLoaded({
				data: {
					loading: false,
					error: false,
					data: response.data,
				},
			}),
		);
	} catch (error) {
		dispatch(
			bridgeRatingsReplacementCostSlice.actions.sliceFailed({
				data: {
					loading: false,
					error: true,
				},
			}),
		)
	};
};

// ==========================================================

const bridgeRatingsReplacementCostSliceSelector = (state: AppState): BridgeRatingsReplacementCostSliceState => state.bridgeRatingsReplacementCost;
export const bridgeRatingsReplacementCostSliceData = createSelector(bridgeRatingsReplacementCostSliceSelector, d => d.data);

// ==========================================================

export default bridgeRatingsReplacementCostSlice;
