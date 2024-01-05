import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import Item from "../../components/item";
import { fetchItem } from "../../services/item/itemSlice";
import { useAppDispatch, useAppSelector } from '../../services/hooks';

const SingleItemPage = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) => state.item.data)

  useEffect(() => {
		if (productId != null) {
			dispatch(fetchItem(productId))
		}
	}, []);

	if (!item) return null

  return (
    <Container maxWidth="lg">{item && <Item {...(item as Item)} />}</Container>
  );
};

export default SingleItemPage;
