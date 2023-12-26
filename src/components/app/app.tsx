import React, { useState, useEffect } from "react";
import Header from "../header";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../../pages/not-found";
import { ProductsContext } from "../../context/product-context";
import { UserContext } from "../../context/user-context";
import CardList from "../card-list";
import Footer from "../footer";
import SearchField from "../search";
import SingleItemPage from "../../pages/single-item-page";
import ProfilePage from "../../pages/profile-page";
import api from "../../utils/api";
import { isLiked } from "../../utils/products";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { fetchUsers } from "../../services/user/userSlice";
import { fetchProducts } from "../../services/products/productsSlice";

const App = () => {
  //const [products, setProducts] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const products = useAppSelector(state => state.products.data);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.user.data);

  function handleChangeSearchInput(value: string) {
    setSearchQuery(value);
  }

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchUsers());
  }, []);

  console.log(products);

 // useEffect(() => {
    //api.search(searchQuery).then((list) => setProducts(list));
  //}, [searchQuery]);

  function handleProductLike(productData: ItemLikeParams) {
    const like = isLiked(productData.likes, currentUser?._id);

    // api.changeLikePostStatus(productData._id, like).then((updateProduct) => {
    //   const newProductsArray = products.map((currentProduct) =>
    //     currentProduct._id === updateProduct._id
    //       ? updateProduct
    //       : currentProduct
    //   );
    //   setProducts(newProductsArray);
    // });
  }

  return (
    <>
      <UserContext.Provider value={currentUser}>
        <ProductsContext.Provider
          value={{ products, handleProductLike: handleProductLike }}
        >
          <Header>
            <SearchField setQuery={handleChangeSearchInput} />
          </Header>
          <Routes>
            <Route path="/" element={<CardList />} />
            <Route path="/product/:productId" element={<SingleItemPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          <Footer />
        </ProductsContext.Provider>
      </UserContext.Provider>
    </>
  );
};

export default App;
