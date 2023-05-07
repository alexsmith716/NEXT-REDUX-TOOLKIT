import { createSlice, createSelector, PayloadAction, } from '@reduxjs/toolkit';
import { AppState, AppThunk } from '../../redux/store';
import { fetchData } from '../../utils/fetchAPI';

export interface BridgeRatingsFullSliceData {
	loading: boolean;
	error: boolean;
	data?: string | null;
};

interface BridgeRatingsFullSliceState {
	data: BridgeRatingsFullSliceData;
};

const bridgeRatingsFullSliceInitialState: BridgeRatingsFullSliceState = {
	data: {
		loading: false,
		error: false,
		data: null,
	}
};

export const bridgeRatingsFullSlice = createSlice({
	name: 'bridgeRatingsFull',
	initialState: bridgeRatingsFullSliceInitialState,
	reducers: {
		sliceLoading(state, {payload}: PayloadAction<BridgeRatingsFullSliceState>) {
			return {
				...state,
				...payload,
			}
		},
		sliceLoaded(state, {payload}: PayloadAction<BridgeRatingsFullSliceState>) {
			return {
				...state,
				...payload,
			}
		},
		sliceFailed(state, {payload}: PayloadAction<BridgeRatingsFullSliceState>) {
			return {
				...state,
				...payload,
			}
		},
	},
});

// ==========================================================

export const fetchBridgeRatingsFull = (): AppThunk => async (dispatch,) => {
	dispatch(
		bridgeRatingsFullSlice.actions.sliceLoading({
			data: {
				loading: true,
				error: false,
			},
		}),
	);

	try {
		const response = await fetchData('botosssgetobject/streambridgeratings');

		dispatch(
			bridgeRatingsFullSlice.actions.sliceLoaded({
				data: {
					loading: false,
					error: false,
					data: response,
				},
			}),
		);
	} catch (error) {
		dispatch(
			bridgeRatingsFullSlice.actions.sliceFailed({
				data: {
					loading: false,
					error: true,
				},
			}),
		)
	};
};

// ==========================================================

const bridgeRatingsFullSliceSelector = (state: AppState): BridgeRatingsFullSliceState => state.bridgeRatingsFull;
export const bridgeRatingsFullSliceData = createSelector(bridgeRatingsFullSliceSelector, d => d.data);

// ==========================================================

export default bridgeRatingsFullSlice;
