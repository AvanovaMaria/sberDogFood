import React, { useState, useEffect, FC, useContext } from "react";
import CardItem from "../card";
import { Grid, Stack, Typography, Pagination } from "@mui/material";
import usePagination from "../../hooks/usePagination";
import {
  ProductsContext,
  ProductsContextInterface,
} from "../../context/product-context";
import { UserContext } from "../../context/user-context";

const PER_PAGE = 12;

const CardList = () => {
  const { products } = useContext(ProductsContext) as ProductsContextInterface;
  const currentUser = useContext(UserContext) as Author;
  const { currentPage, getCurrentData, setPagePaginate, countPage } =
  usePagination<Item>(products, PER_PAGE);

  function handlePageChange(e: any, page: number) {
    setPagePaginate(page);
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "90vw",
        height: "auto",
      }}
    >
      {products.length > 0 ? (
        <div>
          <Grid sx={{ width: "992px" }} container spacing={2}>
            {getCurrentData()?.map((item) => (
              <Grid
                key={item._id}
                item
                sx={{ display: "flex" }}
                xs={12}
                sm={6}
                md={4}
              >
                <CardItem key={item._id} {...item} />
              </Grid>
            ))}
          </Grid>
          <Stack
            spacing={2}
            sx={{
              marginTop: 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography> Страница {currentPage}</Typography>
            <Pagination
              count={countPage}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2>Таких товаров нет в магазине</h2>
        </div>
      )}
    </div>
  );
};

export default CardList;
