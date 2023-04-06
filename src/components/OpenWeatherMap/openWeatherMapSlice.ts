import { createSlice, createSelector, createAction, PayloadAction, } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import axios from 'axios';
import { LatLonType } from '../../types';
import { AppState, AppThunk } from '../../redux/store';
import { formatString } from '../../utils/inputStringFormat';

interface OpenWeatherMapSliceData {
	loading: boolean;
	error: boolean;
	weather?: {
		main: string | null;
		description: string | null;
	};
	main?: {
		temp: number | null;
	};
	name?: string | null;
};

interface OpenWeatherMapSliceState {
	data: OpenWeatherMapSliceData;
};

const openWeatherMapSliceInitialState: OpenWeatherMapSliceState = {
	data: {
		loading: true,
		error: false,
		weather: {
			main: null,
			description: null,
		},
		main: {
			temp: null,
		},
		name: null,
	},
};

const hydrate = createAction<AppState>(HYDRATE);

export const openWeatherMapSlice = createSlice({
	name: 'openWeatherMap',
	initialState: openWeatherMapSliceInitialState,
	reducers: {
		openWeatherMapSliceLoading(state, {payload}: PayloadAction<OpenWeatherMapSliceState>) {
			return {
				...state,
				...payload,
			}
		},
		openWeatherMapSliceLoaded(state, {payload}: PayloadAction<OpenWeatherMapSliceState>) {
			return {
				...state,
				...payload,
			}
		},
		openWeatherMapSliceFailed(state, {payload}: PayloadAction<OpenWeatherMapSliceState>) {
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
				...action.payload.openWeatherMap,
			};
		})
	},
});

// ==========================================================

export const fetchOpenWeatherMapError = (): AppThunk => async (dispatch,) => {
	dispatch(
		openWeatherMapSlice.actions.openWeatherMapSliceFailed({
			data: {
				loading: false,
				error: true,
			},
		}),
	)
};

// ==========================================================

export const fetchOpenWeatherMap = (latLon: LatLonType): AppThunk => async (dispatch, getState) => {
	dispatch(
		openWeatherMapSlice.actions.openWeatherMapSliceLoading({
			data: {
				loading: true,
				error: false,
			},
		}),
	);

	const isServer = typeof window === 'undefined';
	let req: string;

	isServer ? req = `https://api.openweathermap.org/data/2.5/weather?lat=${latLon.lat}&lon=${latLon.lon}&appid=${process.env.NEXT_PUBLIC_APP_ID}&units=imperial` : req = `/api/openweathermap?lat=${latLon.lat}&lon=${latLon.lon}`;

	try {
		const response = await axios.get(req);
		dispatch(
			openWeatherMapSlice.actions.openWeatherMapSliceLoaded({
				data: {
					loading: false,
					error: false,
					weather: {
						main: response.data.weather[0].main,
						description: response.data.weather[0].description
					},
					main: {
						temp: response.data.main.temp
					},
					name: response.data.name
				},
			}),
		)
	} catch (error) {
		dispatch(
			openWeatherMapSlice.actions.openWeatherMapSliceFailed({
				data: {
					loading: false,
					error: true,
				},
			}),
		)
	};

	const state = getState()
	const sod = {...state.openWeatherMap.data}
	console.log('>>>> STORE > getAddress > getState(): ', sod);
};

// ==========================================================

export async function getAddress(geoCode: string) {
	if (geoCode.length < 1 || geoCode.length > 100 || (geoCode.match(/,/g)||[]).length < 2) {
		return Promise.reject();
	}

	const gc:string | undefined = formatString(geoCode, true);

	try {
		const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${gc}&limit=1&appid=${process.env.NEXT_PUBLIC_APP_ID}`);
		const ll = {
			lat: response.data[0].lat,
			lon: response.data[0].lon,
		};
		return ll;
	} catch (error) {
		return Promise.reject();
	}
};

// ==========================================================

const openWeatherMapSliceSelector = (state: AppState): OpenWeatherMapSliceState => state.openWeatherMap;
export const openWeatherMapSliceData = createSelector(openWeatherMapSliceSelector, d => d.data);

// ==========================================================

export default openWeatherMapSlice;
