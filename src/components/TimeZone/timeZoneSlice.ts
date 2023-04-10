import { createSlice, createSelector, createAction, PayloadAction, } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import axios from 'axios';
import { AppState, AppThunk } from '../../redux/store';
//import { validateInput } from '../../utils/cityStateCountryInputValidate';
//import { formatInput  } from '../../utils/cityStateCountryInputFormat';
import { TimeZoneType } from '../../types';

//	{
//		datetime: "2023-04-04 22:14:37",
//		timezone_name: "British Summer Time",
//		timezone_location: "Europe/London",
//		timezone_abbreviation: "BST",
//		gmt_offset: 1,
//		is_dst: true,
//		requested_location: "Oxford, United Kingdom",
//		latitude: 51.7520131,
//		longitude: -1.2578499
//	}

interface TimeZoneSliceData {
	loading: boolean;
	error: boolean;
	datetime?: string | null;
	timezone_name?: string | null;
	timezone_location?: string | null;
	timezone_abbreviation?: string | null;
	gmt_offset?: number | null;
	is_dst?: boolean | null;
	requested_location?: string | null;
	latitude?: number | null;
	longitude?: number | null;
	location?: string | null;
};

interface TimeZoneSliceState {
	data: TimeZoneSliceData;
};

const hydrate = createAction<AppState>(HYDRATE);

const timeZoneSliceInitialState: TimeZoneSliceState = {
	data: {
		loading: false,
		error: false,
		datetime: null,
		timezone_name: null,
		timezone_location: null,
		timezone_abbreviation: null,
		gmt_offset: null,
		is_dst: null,
		requested_location: null,
		latitude: null,
		longitude: null,
		location: null,
	},
};

export const timeZoneSlice = createSlice({
	name: 'timeZone',
	initialState: timeZoneSliceInitialState,
	reducers: {
		sliceLoading(state, {payload}: PayloadAction<TimeZoneSliceState>) {
			return {
				...state,
				...payload,
			}
		},
		sliceLoaded(state, {payload}: PayloadAction<TimeZoneSliceState>) {
			return {
				...state,
				...payload,
			}
		},
		sliceFailed(state, {payload}: PayloadAction<TimeZoneSliceState>) {
			return {
				...state,
				...payload,
			}
		},
		sliceLocationIdentified(state, {payload}: PayloadAction<TimeZoneSliceState>) {
			return {
				...state,
				...payload,
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(hydrate, (state, action) => {
			return {
				...state,
				...action.payload.timeZone,
			};
		});
	},
});

// ==========================================================

export const fetchTimeZoneError = (): AppThunk => async (dispatch,) => {
	dispatch(
		timeZoneSlice.actions.sliceFailed({
			data: {
				loading: false,
				error: true,
			},
		}),
	)
};

// ==========================================================

export const fetchTimeZone = (zone: TimeZoneType): AppThunk => async (dispatch, getState) => {
	console.log('>>>> SLICE > fetchTimeZone ???????????????: ', zone.gc);
	dispatch(
		timeZoneSlice.actions.sliceLoading({
			data: {
				loading: true,
				error: false,
			},
		}),
	);

	const isServer = typeof window === 'undefined';
	let req: string;

	isServer ? req = `https://timezone.abstractapi.com/v1/current_time/?api_key=${process.env.NEXT_PUBLIC_APP_ID_B}&location=${zone.gc}` : req = `/api/timezone?location=${zone.gc}`;

	try {
		const response = await axios.get(req);
		const getSliceLoadedState = getState().timeZone.data;

		dispatch(
			timeZoneSlice.actions.sliceLoaded({
				data: {
					...getSliceLoadedState,
					loading: false,
					error: false,
					datetime: response.data.datetime,
					timezone_name: response.data.timezone_name,
					timezone_location: response.data.timezone_location,
					timezone_abbreviation: response.data.timezone_abbreviation,
					gmt_offset: response.data.gmt_offset,
					is_dst: response.data.is_dst,
					requested_location: response.data.requested_location,
					latitude: response.data.latitude,
					longitude: response.data.longitude,
				},
			}),
		);

		const getSliceLocationIdentifiedState = getState().timeZone.data;

		dispatch(
			timeZoneSlice.actions.sliceLocationIdentified({
				data: {
					...getSliceLocationIdentifiedState,
					location: zone.gc,
				},
			}),
		);
	} catch (error) {
		dispatch(
			timeZoneSlice.actions.sliceFailed({
				data: {
					loading: false,
					error: true,
				},
			}),
		)
	};
};

// ==========================================================

const timeZoneSliceSelector = (state: AppState): TimeZoneSliceState => state.timeZone;
export const timeZoneSliceData = createSelector(timeZoneSliceSelector, d => d.data);

// ==========================================================

export default timeZoneSlice;
