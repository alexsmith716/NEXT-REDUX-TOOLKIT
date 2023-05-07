import { configureStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Action, AnyAction, combineReducers } from 'redux';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
//import logger from 'redux-logger';

import userAgentSlice from './slices/userAgentSlice';
import bridgeRatingsFullSlice from './slices/bridgeRatingsFullSlice';
import bridgeRatingsReplacementCostSlice from './slices/bridgeRatingsReplacementCostSlice';
import bridgeRatingsSlice from './slices/bridgeRatingsSlice';
import nycBridgeRatingsSlice from './slices/nycBridgeRatingsSlice';
import aboutGetSsrSlice from './slices/aboutGetSsrSlice';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// =====================================================================

const reducers = {
	[userAgentSlice.name]: userAgentSlice.reducer,
	[bridgeRatingsFullSlice.name]: bridgeRatingsFullSlice.reducer,
	[bridgeRatingsReplacementCostSlice.name]: bridgeRatingsReplacementCostSlice.reducer,
	[bridgeRatingsSlice.name]: bridgeRatingsSlice.reducer,
	[nycBridgeRatingsSlice.name]: nycBridgeRatingsSlice.reducer,
	[aboutGetSsrSlice.name]: aboutGetSsrSlice.reducer,
};

const rootReducers = combineReducers(reducers);

const makeStore: MakeStore<any> = ({reduxWrapperMiddleware}) => {
	const store = configureStore({
		reducer: rootReducers,
		//devTools: true,
		middleware: getDefaultMiddleware =>
			//[...getDefaultMiddleware(), process.browser ? logger : null, reduxWrapperMiddleware].filter(
			[...getDefaultMiddleware(), reduxWrapperMiddleware].filter(
				Boolean,
			) as any,
	});

	return store;
};

type AppStore = ReturnType<typeof makeStore>;

export type AppState = ReturnType<typeof rootReducers>;
type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const useAppDispatch = () => useDispatch<TypedDispatch<AppState>>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const wrapper = createWrapper<AppStore>(makeStore);
