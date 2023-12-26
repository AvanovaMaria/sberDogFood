import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import {
  ProductsContext,
  ProductsContextInterface,
} from "../../context/product-context";
import { UserContext } from "../../context/user-context";
import { Container } from "@mui/material";
import Item from "../../components/item";
//import { fetchItem } from "../../services/item/itemSlice";
import { useAppDispatch, useAppSelector } from '../../services/hooks';

const SingleItemPage = () => {
  const [item, setItem] = useState<Item | null>(null);
  const { productId } = useParams();
  const currentUser = useContext(UserContext) as Author;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (productId) {
      //dispatch(fetchItem(productId));
      api
        .getProductById(productId)
        .then((dataPost) => setItem(dataPost))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [productId]);

  return (
    <Container maxWidth="lg">{item && <Item {...(item as Item)} />}</Container>
  );
};

export default SingleItemPage;
