import { createSlice, createSelector, createAction, PayloadAction, } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import axios from 'axios';
import { LatLonType } from '../../types';
import { AppState, AppThunk } from '../../redux/store';
import { validateOpenWeatherMapInput, formatString } from '../../utils/inputStringFormat';

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
	location?: string | null;
};

interface OpenWeatherMapSliceState {
	data: OpenWeatherMapSliceData;
};

const hydrate = createAction<AppState>(HYDRATE);

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
		location: null,
	},
};

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
		openWeatherMapSliceLocationIdentified(state, {payload}: PayloadAction<OpenWeatherMapSliceState>) {
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
	console.log()
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
		const statea = getState();
		dispatch(
			openWeatherMapSlice.actions.openWeatherMapSliceLoaded({
				data: {
					...statea.openWeatherMap.data,
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
		);

		const stateb = getState();
		dispatch(
			openWeatherMapSlice.actions.openWeatherMapSliceLocationIdentified({
				data: {
					...stateb.openWeatherMap.data,
					location: latLon.gc,
				},
			}),
		);

		const state = getState()
		const sod = {...state.openWeatherMap.data}
		console.log('>>>> STORE > fetchOpenWeatherMap > getState(): ', sod);
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
};

// ==========================================================

export async function getAddress(geoCode: string) {
	if (!validateOpenWeatherMapInput(geoCode)) {
		return Promise.reject();
	}

	const gc:string | undefined = formatString(geoCode, true);

	try {
		const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${gc}&limit=1&appid=${process.env.NEXT_PUBLIC_APP_ID}`);
		const ll = {
			lat: response.data[0].lat,
			lon: response.data[0].lon,
			gc: gc,
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
