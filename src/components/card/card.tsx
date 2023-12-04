import React, { FC } from "react";
import { NavLink } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  SvgIconProps,
  SvgIcon,
  Button,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface ProductsCardProps {
  item: Item;
}

const CardItem: FC<ProductsCardProps> = ({ item: item }) => {
  var discountNewContent;
  if (item.discount !== 0) {
    discountNewContent = (
        <div style={{ borderRadius: "15px", backgroundColor: "red", color: "white" }}> - {item.discount} %</div>
    )
  } else {
    discountNewContent = null
  }

  return (
    <Card sx={{ width: 350 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>{discountNewContent}</div>
        <div>
          <FavoriteBorderIcon fontSize="small" />
        </div>
      </div>
      <NavLink to={{ pathname: `/product/${item._id}` }}>
      <CardMedia
        component="img"
        height="194"
        image={item.pictures ? item.pictures : "https://picsum.photos/480/320"}
        alt=""
        sx={{ margin: "10px" }}
      />
      </NavLink>
      <CardHeader title={`${item.price} P`} />
      <div>{item.wight}</div>
      <NavLink style={{ color: "black" }} to={{ pathname: `/product/${item._id}` }}>
        <Typography>{item.name}</Typography>
      </NavLink>
      <button
        style={{
          borderRadius: "20px",
          backgroundColor: "#FFE44D",
          color: "black",
          margin: "20px",
        }}
      >
        В корзину
      </button>
    </Card>
  );
};

export default CardItem;
