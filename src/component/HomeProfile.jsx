/** @format */
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { UsePosts } from "../contaxt/PostsContext";
import { Link } from "react-router-dom";
import { useToast } from "../contaxt/ToastContext";
export default function HomeProfile() {
  const { auth, setAuth,setTargetPost } = UsePosts();
  const { handleToast } = useToast();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  if (auth.user != null) {
    return (
      <>
        {" "}
        <Box>
          <Tooltip title={`${auth.user.name}`}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="Remy Sharp"
                src={`${auth.user.profile_image}` ?? ""}
              />
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <Link
              to={`/users/${auth.user.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Avatar
                  alt="Remy Sharp"
                  src={`${auth.user.profile_image ?? ""}`}
                />
                <Typography
                  style={{ marginLeft: "0.5rem", fontWeight: "bold" }}
                  textAlign="center"
                >
                  {auth.user.name}
                </Typography>
              </MenuItem>
            </Link>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <MenuItem
                onClick={() => {
                  setTargetPost(null);
                  handleToast("You have been logged out successfully", "error");
                  window.localStorage.clear();
                  setAuth({ token: null, user: null });
                  handleCloseUserMenu();
                }}
              >
                <LogoutIcon
                  style={{
                    marginRight: " 0.5rem",
                    background: "#e0e0e0",
                    borderRadius: "50%",
                    fontSize: "2rem",
                    padding: "0.4rem",
                  }}
                />
                <Typography textAlign="center" style={{ fontWeight: "bold" }}>
                  logout
                </Typography>
              </MenuItem>
            </Link>
          </Menu>
        </Box>
      </>
    );
  } else {
    return <></>;
  }
}
