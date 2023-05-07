import { createSlice, createSelector, PayloadAction, } from '@reduxjs/toolkit';
import { AppState, AppThunk } from '../../redux/store';
import { fetchData } from '../../utils/fetchAPI';

export interface BridgeRatingsSliceData {
	loading: boolean;
	error: boolean;
	data?: string | null;
};

interface BridgeRatingsSliceState {
	data: BridgeRatingsSliceData;
};

const bridgeRatingsSliceInitialState: BridgeRatingsSliceState = {
	data: {
		loading: false,
		error: false,
		data: null,
	}
};

export const bridgeRatingsSlice = createSlice({
	name: 'bridgeRatings',
	initialState: bridgeRatingsSliceInitialState,
	reducers: {
		sliceLoading(state, {payload}: PayloadAction<BridgeRatingsSliceState>) {
			return {
				...state,
				...payload,
			}
		},
		sliceLoaded(state, {payload}: PayloadAction<BridgeRatingsSliceState>) {
			return {
				...state,
				...payload,
			}
		},
		sliceFailed(state, {payload}: PayloadAction<BridgeRatingsSliceState>) {
			return {
				...state,
				...payload,
			}
		},
	},
});
 
// ==========================================================

export const fetchBridgeRatings = (): AppThunk => async (dispatch,) => {
	dispatch(
		bridgeRatingsSlice.actions.sliceLoading({
			data: {
				loading: true,
				error: false,
			},
		}),
	);

	try {
		const response = await fetchData('botosssgetobject/bridgeratings');

		dispatch(
			bridgeRatingsSlice.actions.sliceLoaded({
				data: {
					loading: false,
					error: false,
					data: response,
				},
			}),
		);
	} catch (error) {
		dispatch(
			bridgeRatingsSlice.actions.sliceFailed({
				data: {
					loading: false,
					error: true,
				},
			}),
		)
	};
};

// ==========================================================

const bridgeRatingsSliceSelector = (state: AppState): BridgeRatingsSliceState => state.bridgeRatings;
export const bridgeRatingsSliceData = createSelector(bridgeRatingsSliceSelector, d => d.data);

// ==========================================================

export default bridgeRatingsSlice;
