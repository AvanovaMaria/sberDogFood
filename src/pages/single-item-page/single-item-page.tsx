import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import { ProductsContext, ProductsContextInterface } from '../../context/product-context';
import { Container } from '@mui/material';
import Item from '../../components/item';

const SingleItemPage = () => {
    const [item, setItem] = useState<Item | null>(null);
    const { productId } = useParams();

    useEffect(() => {
		if (productId) {
			api
				.getProductById(productId)
				.then((dataPost) => setItem(dataPost))
				.catch((err) => {
					console.log(err);
				});
		}
	}, [productId])

	console.log(item);

	return (
		<Container maxWidth='lg'>
			<Item item={item as Item} />
		</Container>
	)
}

export default SingleItemPage;