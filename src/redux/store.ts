import { configureStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Action, AnyAction, combineReducers } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import openWeatherMapSlice from '../components/OpenWeatherMap/openWeatherMapSlice';
import userAgentSlice from '../components/UserAgent/userAgentSlice';
//import timeZoneSlice from '../components/TimeZone/timeZoneSlice';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// =====================================================================

const reducers = {
	[openWeatherMapSlice.name]: openWeatherMapSlice.reducer,
	[userAgentSlice.name]: userAgentSlice.reducer,
	//[timeZoneSlice.name]: timeZoneSlice.reducer,
};

const rootReducers = combineReducers(reducers);

const makeStore = () => {
	const isServer = typeof window === 'undefined';

	if (isServer) {
		return configureStore({
			reducer: rootReducers,
			//devTools: true,
		});
	} else {
		const store = configureStore({
			reducer: rootReducers,
			//devTools: true,
		});

		return store;
	}
};

type AppStore = ReturnType<typeof makeStore>;

// https://github.com/reduxjs/redux-thunk/issues/333
export type AppState = ReturnType<typeof rootReducers>;
type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const useAppDispatch = () => useDispatch<TypedDispatch<AppState>>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const wrapper = createWrapper<AppStore>(makeStore);
