import React, { FC } from "react";
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
      <CardMedia
        component="img"
        height="194"
        image={item.pictures ? item.pictures : "https://picsum.photos/480/320"}
        alt=""
        sx={{ margin: "10px" }}
      />
      <CardHeader title={`${item.price} P`} />
      <div>{item.wight}</div>
       <Typography>{item.name}</Typography>
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
