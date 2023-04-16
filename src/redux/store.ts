import { configureStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Action, combineReducers } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import openWeatherMapSlice from './slices/openWeatherMapSlice';
import userAgentSlice from './slices/userAgentSlice';
import timeZoneSlice from './slices/timeZoneSlice';
import bridgeRatingsSlice from './slices/bridgeRatingsSlice';
import bridgeRatingsFullSlice from './slices/bridgeRatingsFullSlice';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// =====================================================================

const reducers = {
	[openWeatherMapSlice.name]: openWeatherMapSlice.reducer,
	[userAgentSlice.name]: userAgentSlice.reducer,
	[timeZoneSlice.name]: timeZoneSlice.reducer,
	[bridgeRatingsFullSlice.name]: bridgeRatingsFullSlice.reducer,
	[bridgeRatingsSlice.name]: bridgeRatingsSlice.reducer,
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

export type AppState = ReturnType<typeof rootReducers>;
type TypedDispatch<T> = ThunkDispatch<T, any, Action>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const useAppDispatch = () => useDispatch<TypedDispatch<AppState>>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const wrapper = createWrapper<AppStore>(makeStore);
