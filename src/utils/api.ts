import { config } from './config';

type TConfigApi = {
	baseUrl: string;
	headers: HeadersInit;
};

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

    getAllInfo() {
		return Promise.all([this.getProductsList(), this.getUserInfo()]);
	}

    getUserInfo() {
		return fetch(this.getApiUrl('users/me'), {
			headers: this.headers,
		}).then(this.onResponse);
	}

    getProductsList() {
		return fetch(this.getApiUrl('products'), {
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

	changeLikePostStatus(postID: string, like: boolean) {
		return fetch(this.getApiUrl(`products/likes/${postID}`), {
			method: like ? 'DELETE' : 'PUT',
			headers: this.headers,
		}).then(this.onResponse);
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
}

const api = new Api({
	baseUrl: config.apiUrl,
	headers: {
		'content-type': 'application/json',
		authorization: `Bearer ${config.apiToken}`,
	},
});

export default api;