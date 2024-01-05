import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { fetchUsers, fetchEditedUser } from "../../services/user/userSlice";
import { useEffect, useState } from "react";
import "./edit-profile.module.css";
import {
  Button,
  Input,
  Typography,
  unstable_useEnhancedEffect,
  useEventCallback,
} from "@mui/material";
import { Link } from "react-router-dom";

const EditProfileForm = () => {
  const currentUser = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (!currentUser) return null;
  const [name, setName] = useState<string>(
    currentUser.name ? currentUser.name : ""
  );
  const [about, setAbout] = useState<string>(
    currentUser.about ? currentUser.about : ""
  );

  const handleChangeUserData = () => {
    dispatch(fetchEditedUser({ name, about }));
  };
  return (
    <>
      <div className="MainForm">
        <Link to="/profile">Назад</Link>
        <Typography variant="h3">Профиль</Typography>
        <div className="TextForm">
          <div>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="name"
            />
          </div>
          <div>
            <Input
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="about"
            />
          </div>
          <div>
            <Button variant="outlined" onClick={handleChangeUserData}>
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfileForm;
