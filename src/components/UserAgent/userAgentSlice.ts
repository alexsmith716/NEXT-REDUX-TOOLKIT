import { createSlice,createSelector,PayloadAction, } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState, AppThunk } from '../../redux/store';

interface UserAgentSliceData {
	userAgent: string;
	isBot: string;
};

interface UserAgentSliceState {
	data: UserAgentSliceData | null;
};

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
		builder.addCase(HYDRATE, (state, action) => {
			return {
				...state,
				...action.payload.userAgent,
			};
		})
	},
});

// ==========================================================

export const setUserAgent = (userAgent: string, isBot: string): AppThunk => async (dispatch,) => {
	dispatch(
		userAgentSlice.actions.userAgentLoaded({
			data: {
				userAgent: userAgent,
				isBot: isBot,
			},
		}),
	)
};

// ==========================================================

const userAgentSliceSelector = (state: AppState): UserAgentSliceState => state.userAgent;
export const userAgentSliceData = createSelector(userAgentSliceSelector, d => d.data);

// ==========================================================

export default userAgentSlice;
