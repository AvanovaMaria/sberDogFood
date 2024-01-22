import { config, customBaseQuery } from './config';
import { createApi } from '@reduxjs/toolkit/query/react';

type TConfigApi = {
	baseUrl: string;
	headers: HeadersInit;
};

export type UserEditBodyDto = {
	about: string
	name: string
}
export type ItemEditBodyDto = Pick<Item, '_id'>;

type BE_SignUpResponse = Pick<Author, '_id'>;

interface BE_SignInResponse {
	data: BE_SignUpResponse
	token: Tokens['accessToken']
}

type SignInResponse = {
	data: Author
	token: Tokens['accessToken']
}

interface SignInFormValues {
	email: string
	password: string
}

interface SignUpFormValues {
	email: string
	group: string
	password: string
}

export const authApi = createApi({
	reducerPath: 'authApi',
	tagTypes: ['Author'],
	baseQuery: customBaseQuery,
	endpoints: (builder) => ({
		signUp: builder.mutation<BE_SignUpResponse, SignUpFormValues>({
			query: (signUpFormValues) => ({
				url: '/signup',
				method: 'POST',
				body: signUpFormValues,
			}),
		}),
		signIn: builder.mutation<SignInResponse, SignInFormValues>({
			query: (signInFormValues) => ({
				url: '/signin',
				method: 'POST',
				body: signInFormValues,
			}),
		}),
	}),
});

export const { useSignUpMutation, useSignInMutation } = authApi;

export class Api {
    private baseUrl;
	private headers;

    constructor({ baseUrl, headers }: TConfigApi) {
		this.baseUrl = baseUrl;
		this.headers = headers;
	}

    private onResponse(res: Response) {
		return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
	}

	private getApiUrl(path: string) {
		return `${this.baseUrl}/${path}`;
	}

    getUserInfo() {
		return fetch(this.getApiUrl('users/me'), {
			headers: this.headers,
		}).then(this.onResponse);
	}

	setUserInfo(userData: UserEditBodyDto) {
		return fetch(this.getApiUrl('users/me/'), {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify(userData),
		}).then(this.onResponse);
	}

    getProductsList(payload: {
		search?: string
	}): Promise<FetchAllProducts> {
		return fetch(this.getApiUrl(`products?query=${payload.search}`), {
			headers: this.headers,
		}).then(this.onResponse);
	}

    getProductById(productID: string) {
		return fetch(this.getApiUrl(`products/${productID}`), {
			headers: this.headers,
		}).then(this.onResponse);
	}

    search(searchQuery: string) {
		return fetch(this.getApiUrl(`products/search?query=${searchQuery}`), {
			headers: this.headers,
		}).then(this.onResponse);
	}

	addLikes(payload: { productId: string }) {
		return fetch(this.getApiUrl(`/products/likes/${payload.productId}`), {
			method: 'PUT',
			headers: this.headers,
		}).then(this.onResponse)
	}

	deleteLikes(payload: { productId: string }) {
		return fetch(this.getApiUrl(`/products/likes/${payload.productId}`), {
			method: 'DELETE',
			headers: this.headers,
		}).then(this.onResponse)
	}

    addProducts(postData: Pick<Item, 'pictures' | 'price' | 'name' | 'description' | 'tags'>) {
		return fetch(this.getApiUrl('products'), {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(postData),
		}).then(this.onResponse);
	}

    deleteProductById(productID: string) {
		return fetch(this.getApiUrl(`products/${productID}`), {
			method: 'DELETE',
			headers: this.headers,
		}).then(this.onResponse);
	}

    getReviews() {
		return fetch(this.getApiUrl('products/review/'), {
			headers: this.headers,
		}).then(this.onResponse);
	}

	leaveItemReview(productID: string, postData: Pick<Review, 'text'>) {
		return fetch(this.getApiUrl('products/review/:productId'), {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(postData),
		}).then(this.onResponse)
	}
}

const api = new Api({
	baseUrl: config.apiUrl,
	headers: {
		'content-type': 'application/json',
		authorization: `Bearer ${config.apiToken}`,
	},
});

export default api;