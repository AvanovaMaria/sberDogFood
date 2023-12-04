import React, { useState, useEffect, FC } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalMallIcon from "@mui/icons-material/LocalMall";

interface HeaderProps {
  children: any;
}

const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <Box sx={{ flexGrow: 2, height: "80px", width: "1440px" }}>
      <AppBar
        sx={{ backgroundColor: "#FFE44D", color: "black" }}
        position="static"
      >
        <Toolbar>
          Logo
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
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              sx={{ color: "black" }}
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
