import React, { useState, useEffect } from 'react';
// import styles from './app.module.css';
import Header from '../header';
import { productsData } from '../../products';
import CardList from '../card-list';
import Footer from '../footer';
import SearchField from '../search';

const App = () => {
    const [products, setProducts] = useState<Item[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    function handleChangeSearchInput(value: string) {
        setSearchQuery(value);
    };

    useEffect(() => {
        let newProducts: Array<any> = [];
        productsData?.map((item) => {
            if (item.name.toLowerCase().includes(searchQuery)) {
                newProducts.push(item);
            }
            return newProducts
        })
        setProducts(newProducts);
    }, [searchQuery]);

	return (
		<>
			<Header>
                <SearchField setQuery={handleChangeSearchInput} />
            </Header>
            <CardList products={products} />
            <Footer />
		</>
	);
};

export default App;