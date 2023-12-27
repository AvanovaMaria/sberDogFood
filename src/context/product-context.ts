import { createContext } from 'react';

export interface ProductsContextInterface {
	products: Item[];
	handleProductLike: (productData: ItemLikeParams) => void;
}

export const ProductsContext = createContext<ProductsContextInterface | null>(null);

ProductsContext.displayName = 'PostsContext';