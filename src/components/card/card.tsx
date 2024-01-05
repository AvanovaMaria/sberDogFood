import React, { FC, useState, useEffect } from "react";
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
import { setColorForIcon } from "../../utils/cardItemUtils";
import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { fetchUsers } from "../../services/user/userSlice";

const CardItem: FC<Item> = ({
  _id,
  discount,
  likes,
  pictures,
  price,
  wight,
  name,
}) => {
  const [valueRating, setValueRating] = useState<number | null>(2);
  const currentUser = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  });

  if (!currentUser) return null;

  let discountNewContent;
  if (discount !== 0) {
    discountNewContent = (
      <div
        style={{ borderRadius: "15px", backgroundColor: "red", color: "white" }}
      >
        {" "}
        - {discount} %
      </div>
    );
  } else {
    discountNewContent = null;
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
        <span>{discountNewContent}</span>
        <div>
          <Button>
            <FavoriteBorderIcon
              sx={{ color: setColorForIcon(likes, currentUser._id) }}
              fontSize="small"
            />
            {likes.length}
          </Button>
        </div>
      </div>
      <NavLink to={{ pathname: `/product/${_id}` }}>
        <CardMedia
          component="img"
          height="194"
          image={pictures ? pictures : "https://picsum.photos/480/320"}
          alt=""
          sx={{ margin: "10px" }}
        />
      </NavLink>
      <CardHeader title={`${price} P`} />
      <div>{wight}</div>
      <NavLink style={{ color: "black" }} to={{ pathname: `/product/${_id}` }}>
        <Typography>{name}</Typography>
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
