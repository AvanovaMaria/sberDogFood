import React, { useState, useEffect, FC } from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { logo } from "../image/logo";
import { accessTokenSelector } from '../../services/authSlice/authSlice';
import { useAppSelector } from '../../services/hooks';

interface HeaderProps {
  children: any;
}

const Header: FC<HeaderProps> = ({ children }) => {
  const accessToken = useAppSelector(accessTokenSelector);

  return (
    <Box sx={{ flexGrow: 2, height: "80px", width: "1440px" }}>
      <AppBar
        sx={{ backgroundColor: "#FFE44D", color: "black" }}
        position="static"
      >
        <Toolbar>
          <NavLink to="/">
            <>{logo}</>
          </NavLink>
          <Box sx={{ flexGrow: 3 }} />
          {children}
          <Box sx={{ flexGrow: 3 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" sx={{ color: "black" }}>
              <Badge>
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" sx={{ color: "black" }}>
              <Badge>
                <LocalMallIcon />
              </Badge>
            </IconButton>
            {accessToken ? (
              <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              sx={{ color: "black" }}
            >
              <NavLink
                style={{ color: "black", marginRight: "10px" }}
                to={{ pathname: `/profile` }}
              >
                <AccountCircle />
              </NavLink>
            </IconButton>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
              <NavLink to={{ pathname: `/sign-in` }}>Sign In</NavLink>
              <NavLink to={{ pathname: `/sign-up` }}>Sign Up</NavLink>
            </Box>
              )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
