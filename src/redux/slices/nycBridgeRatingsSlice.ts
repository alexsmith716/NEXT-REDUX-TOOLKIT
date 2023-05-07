import { createSlice, createSelector, PayloadAction, } from '@reduxjs/toolkit';
import { AppState, AppThunk } from '../../redux/store';
import { fetchBridgeRatings } from '../../utils/fetchBridgeRatings';

export interface NycBridgeRatingsSliceData {
	loading: boolean;
	error: boolean;
	data?: string | null;
};

interface NycBridgeRatingsSliceState {
	data: NycBridgeRatingsSliceData;
};

const nycBridgeRatingsSliceInitialState: NycBridgeRatingsSliceState = {
	data: {
		loading: false,
		error: false,
		data: null,
	}
};

export const nycBridgeRatingsSlice = createSlice({
	name: 'nycBridgeRatings',
	initialState: nycBridgeRatingsSliceInitialState,
	reducers: {
		sliceLoading(state, {payload}: PayloadAction<NycBridgeRatingsSliceState>) {
			return {
				...state,
				...payload,
			}
		},
		sliceLoaded(state, {payload}: PayloadAction<NycBridgeRatingsSliceState>) {
			return {
				...state,
				...payload,
			}
		},
		sliceFailed(state, {payload}: PayloadAction<NycBridgeRatingsSliceState>) {
			return {
				...state,
				...payload,
			}
		},
	},
});

// ==========================================================

export const fetchNycBridgeRatingsError = (): AppThunk => async (dispatch,) => {
	dispatch(
		nycBridgeRatingsSlice.actions.sliceFailed({
			data: {
				loading: false,
				error: true,
			},
		}),
	)
};

// ==========================================================

export const fetchNycBridgeRatings = (): AppThunk => async (dispatch,) => {
	dispatch(
		nycBridgeRatingsSlice.actions.sliceLoading({
			data: {
				loading: true,
				error: false,
			},
		}),
	);

	try {
		const response = await fetchBridgeRatings();

		dispatch(
			nycBridgeRatingsSlice.actions.sliceLoaded({
				data: {
					loading: false,
					error: false,
					data: response.result,
				},
			}),
		);
	} catch (error) {
		dispatch(
			nycBridgeRatingsSlice.actions.sliceFailed({
				data: {
					loading: false,
					error: true,
				},
			}),
		)
	};
};

// ==========================================================

const nycBridgeRatingsSliceSelector = (state: AppState): NycBridgeRatingsSliceState => state.nycBridgeRatings;
export const nycBridgeRatingsSliceData = createSelector(nycBridgeRatingsSliceSelector, d => d.data);

// ==========================================================

export default nycBridgeRatingsSlice;
