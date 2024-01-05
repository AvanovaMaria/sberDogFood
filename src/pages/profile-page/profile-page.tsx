import { FC, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { fetchUsers } from "../../services/user/userSlice";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const currentUser = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (!currentUser) return null;

  return (
    <>
      <Card sx={{ maxWidth: "lg" }}>
        <CardMedia
          sx={{ height: 100, width: 100, borderRadius: "50%" }}
          image={
            currentUser.avatar
              ? currentUser.avatar
              : "https://picsum.photos/480/320"
          }
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {currentUser.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentUser.about}
          </Typography>
        </CardContent>
      </Card>
      <Link to="/profile-edit">Изменить данные профиля</Link>
    </>
  );
};

export default ProfilePage;
