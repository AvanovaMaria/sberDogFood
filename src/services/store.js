import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import api from '../utils/api';
import { authApi } from '../utils/api';

const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: api,
			},
			serializableCheck: false,
		}).concat([authApi.middleware]),
});

export default store;