import { createSlice, createSelector, createAction, PayloadAction, } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import axios from 'axios';
import { AppState, AppThunk } from '../../redux/store';

export interface AboutGetSsrSliceData {
	loading: boolean;
	error: boolean;
	data?: {
		userId: number
		id: number
		title: string
		body: string
	}[] | null;
};

interface AboutGetSsrSliceState {
	data: AboutGetSsrSliceData;
};

const hydrate = createAction<AppState>(HYDRATE);

const aboutGetSsrSliceInitialState: AboutGetSsrSliceState = {
	data: {
		loading: false,
		error: false,
		data: null,
	}
};

export const aboutGetSsrSlice = createSlice({
	name: 'aboutGetSsr',
	initialState: aboutGetSsrSliceInitialState,
	reducers: {
		sliceLoading(state, {payload}: PayloadAction<AboutGetSsrSliceState>) {
			return {
				...state,
				...payload,
			}
		},
		sliceLoaded(state, {payload}: PayloadAction<AboutGetSsrSliceState>) {
			return {
				...state,
				...payload,
			}
		},
		sliceFailed(state, {payload}: PayloadAction<AboutGetSsrSliceState>) {
			return {
				...state,
				...payload,
			}
		},
	},
	extraReducers: builder => {
		builder.addCase(hydrate, (state, action) => {
			return {
				...state,
				...action.payload.aboutGetSsr,
			};
		})
	},
});

// ==========================================================

export const fetchAboutGetSsrError = (): AppThunk => async (dispatch,) => {
	dispatch(
		aboutGetSsrSlice.actions.sliceFailed({
			data: {
				loading: false,
				error: true,
			},
		}),
	)
};
 
// ==========================================================

export const fetchAboutGetSsr = (): AppThunk => async (dispatch,) => {
	dispatch(
		aboutGetSsrSlice.actions.sliceLoading({
			data: {
				loading: true,
				error: false,
			},
		}),
	);

	try {
		const limit: number = Math.floor(Math.random() * 6) + 1;
		const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {params: {_limit:`${limit}`}})

		dispatch(
			aboutGetSsrSlice.actions.sliceLoaded({
				data: {
					loading: false,
					error: false,
					data: response.data,
				},
			}),
		);
	} catch (error) {
		dispatch(
			aboutGetSsrSlice.actions.sliceFailed({
				data: {
					loading: false,
					error: true,
				},
			}),
		)
	};
};

// ==========================================================

const aboutGetSsrSliceSelector = (state: AppState): AboutGetSsrSliceState => state.aboutGetSsr;
export const aboutGetSsrSliceData = createSelector(aboutGetSsrSliceSelector, d => d.data);

// ==========================================================

export default aboutGetSsrSlice;
