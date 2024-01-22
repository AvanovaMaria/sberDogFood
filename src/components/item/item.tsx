import React, { FC, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardMedia,
  Button,
  Rating,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { setColorForIcon } from "../../utils/cardItemUtils";
import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { fetchUsers } from "../../services/user/userSlice";

const Item: FC<Item> = ({
  _id,
  discount,
  likes,
  pictures,
  price,
  wight,
  name,
  reviews,
  description,
}) => {
  const [valueRating, setValueRating] = React.useState<number | null>(2);
  const currentUser = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (!currentUser) return null;
  let discountNewContent;
  if (discount) {
    if (discount !== 0) {
      discountNewContent = (
        <div
          style={{
            borderRadius: "15px",
            backgroundColor: "red",
            color: "white",
          }}
        >
          {" "}
          - {discount} %
        </div>
      );
    } else {
      discountNewContent = null;
    }
  } else {
    discountNewContent = null;
  }

  function setRatingStatus() {
    let ratingArray: any = [];
    reviews?.map((review) => ratingArray.push(review.rating));
    let sum = 0;
    ratingArray.forEach((num: number) => {
      sum += num;
    });
    let result: number = sum / ratingArray.length;
    return result;
  }

  function getAllReviews() {
    let components: any = [];
    reviews?.map((review) => {
      components.push(
        <>
          <div>
            <h3>{review.author.name}</h3>
          </div>
          <div>
            <Rating value={review.rating} readOnly />
          </div>
          <div>{review.text}</div>
        </>
      );
    });
    return components;
  }

  function setNounForm() {
    let num = reviews.length;
    let lastSymb: string = num.toString().slice(-1);
    switch (lastSymb) {
      case "1":
        return "отзыв";

      case "2":
      case "3":
      case "4":
        return "отзыва";

      default:
        return "отзывов";
    }
  }

  return (
    <>
      <NavLink style={{ marginBottom: "20px" }} to="/">
        Назад
      </NavLink>
      <div>
        <h2>{name}</h2>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div style={{ alignItems: "center" }}>
          <Rating name="read-only" value={setRatingStatus()} readOnly />{" "}
          <span>
            {reviews.length} {setNounForm()}
          </span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "20px",
        }}
      >
        <div>
          <Card sx={{ width: 600 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            ></div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <span>{discountNewContent}</span>
              <div>
                <FavoriteBorderIcon
                  sx={{ color: setColorForIcon(likes, currentUser._id) }}
                  fontSize="small"
                />
                {likes.length}
              </div>
            </div>

            <CardMedia
              component="img"
              height="500px"
              width="500px"
              image={pictures ? pictures : "https://picsum.photos/480/320"}
              alt=""
            />
          </Card>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              margin: "40px",
            }}
          >
            <CardHeader title={`${price} P`} />
            <Button
              style={{
                borderRadius: "20px",
                backgroundColor: "#FFE44D",
                color: "black",
                margin: "20px",
              }}
            >
              В корзину
            </Button>
            <div>
              <h3>Описание:</h3>
              <span>{description}</span>
            </div>
            <div>
              <h3>Характеристики:</h3>
              <div>
                <span>Вес:</span> <span>{wight}</span>
                <br></br>
                <span>Цена:</span> <span>{price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
          <h3>Отзывы:</h3>
          <div>{getAllReviews()}</div>
        </div>
      </div>
    </>
  );
};

export default Item;