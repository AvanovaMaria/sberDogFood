import React, { FC, useContext } from "react";
import { NavLink } from "react-router-dom";
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
import { UserContext } from "../../context/user-context";

interface ProductsCardProps {
  item: Item;
}

const Item: FC<ProductsCardProps> = ({ item }) => {
  const currentUser = useContext(UserContext);

  // var discountNewContent;
  // if (item.discount) {
  //   if (item.discount !== 0) {
  //     discountNewContent = (
  //         <div style={{ borderRadius: "15px", backgroundColor: "red", color: "white" }}> - {item.discount} %</div>
  //     )
  //   } else {
  //     discountNewContent = null
  //   }
  // } else {
  //   discountNewContent = null
  // }

  return (
    <>
      {/* <div>
      <NavLink to='/'>
        Back
      </NavLink>
    </div> */}
      <Card sx={{ width: 350 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* <div>{discountNewContent}</div>  */}
          <div>
            <FavoriteBorderIcon fontSize="small" />
          </div>
        </div>

        <CardMedia
          component="img"
          height="194"
          image={
            item.pictures ? item.pictures : "https://picsum.photos/480/320"
          }
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
    </>
  );
};

export default Item;
