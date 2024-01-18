import React, { useState, useEffect } from "react";
import Header from "../header";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../../pages/not-found";
import CardList from "../card-list";
import Footer from "../footer";
import SearchField from "../search";
import SingleItemPage from "../../pages/single-item-page";
import ProfilePage from "../../pages/profile-page";
import EditProfileForm from "../../pages/edit-profile-page";
import { SignInPage } from "../../pages/sign-in-page/sign-in-page";
import { SignUpForm } from "../../pages/sign-up-page/sign-up-page";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { fetchProducts } from "../../services/products/productsSlice";

const App = () => {
  const [search, setSearch] = useState<string>("");
  const setSearchValue = () => setSearch("");
  const products = useAppSelector((state) => state.products.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts({ search }));
  }, [search]);

  return (
    <>
      <Header>
        <SearchField
          setQuery={setSearch}
          value={search}
          onReset={setSearchValue}
        />
      </Header>
      <Routes>
        <Route path="/" element={<CardList products={products} search={search} />} />
        <Route path="/product/:productId" element={<SingleItemPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile-edit" element={<EditProfileForm />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
