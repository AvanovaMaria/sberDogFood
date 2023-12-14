import { FC, useContext } from "react";
import { UserContext } from "../../context/user-context";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ProfilePage = () => {
  const currentUser = useContext(UserContext) as Author;

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
    </>
  );
};

export default ProfilePage;
