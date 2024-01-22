import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { RootState } from '../services/types';

export const config = {
  apiUrl: "https://api.react-learning.ru",
  apiToken:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTY4YWM1YmFmMjA3YTRlZGJmZGVlNjMiLCJncm91cCI6InNiLTQiLCJpYXQiOjE3MDEzNTg2ODYsImV4cCI6MTczMjg5NDY4Nn0.AAv7Ivm4AlsxN5LVeNZx9q6Ke9OC_HIzMIcT2C6Pa6A',
};

export const customBaseQuery = fetchBaseQuery({
	baseUrl: config.apiUrl,
	prepareHeaders: (headers, { getState }) => {
		const accessToken = (getState() as RootState).auth.accessToken

		if (accessToken) {
			headers.set('authorization', `Bearer ${accessToken}`)
		}
		return headers
	},
})


