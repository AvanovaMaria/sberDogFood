import { createContext } from 'react';

export interface ProductsContextInterface {
	products: Item[];
}

export const ProductsContext = createContext<ProductsContextInterface | null>(null);

ProductsContext.displayName = 'PostsContext';