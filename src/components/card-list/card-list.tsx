import React, { useEffect } from "react";
import CardItem from "../card";
import { Grid, Stack, Typography, Pagination } from "@mui/material";
import usePagination from "../../hooks/usePagination";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { fetchUsers } from "../../services/user/userSlice";
import { fetchProducts } from "../../services/products/productsSlice";

const PER_PAGE = 12;

interface CardListProps {
  search?: string;
  products: Item[]
}

const CardList = (props: CardListProps) => {
  const search = props.search;
  const products = props.products;
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.data);
  const { currentPage, getCurrentData, setPagePaginate, countPage } =
  usePagination<Item>(products, PER_PAGE);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  function handlePageChange(e: any, page: number) {
    setPagePaginate(page);
  }

  if (!products)
    return (
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
    );

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
      {
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
      }
    </div>
  );
};

export default CardList;
