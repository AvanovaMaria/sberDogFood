import { combineReducers } from 'redux';
import { ItemSlice } from './item/itemSlice';
import userReducer from './user/userSlice';
import itemReducer from './item/itemSlice';
import productsReducer from './products/productsSlice'
import { authReducer } from './authSlice/authSlice';
import { authApi } from '../utils/api';

export const rootReducer = combineReducers({
	 user: userReducer,
	 item: itemReducer,
	 products: productsReducer,
	 auth: authReducer,
	 [authApi.reducerPath]: authApi.reducer,
});