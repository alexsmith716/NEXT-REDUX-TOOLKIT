import { createSlice, createSelector, createAction, PayloadAction, } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState, AppThunk } from '../store';

interface UserAgentSliceData {
	userAgent: string;
	host: string;
};

interface UserAgentSliceState {
	data: UserAgentSliceData | null;
};

const hydrate = createAction<AppState>(HYDRATE);

const userAgentSliceInitialState: UserAgentSliceState = {
	data: null,
};

export const userAgentSlice = createSlice({
	name: 'userAgent',
	initialState: userAgentSliceInitialState,
	reducers: {
		userAgentLoaded(state, {payload}: PayloadAction<UserAgentSliceState>) {
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
				...action.payload.userAgent,
			};
		})
	},
});

// ==========================================================

export const setUserAgent = (userAgent: string, host: string): AppThunk => async (dispatch,) => {
	dispatch(
		userAgentSlice.actions.userAgentLoaded({
			data: {
				userAgent: userAgent,
				host: host,
			},
		}),
	)
};

// ==========================================================

const userAgentSliceSelector = (state: AppState): UserAgentSliceState => state.userAgent;
export const userAgentSliceData = createSelector(userAgentSliceSelector, d => d.data);

// ==========================================================

export default userAgentSlice;
