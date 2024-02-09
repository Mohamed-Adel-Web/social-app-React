/** @format */
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { UsePosts } from "../contaxt/PostsContext";
import { useToast } from "../contaxt/ToastContext";
import axios from "axios";
export default function Login() {
  const [open, setOpen] = useState(false);
  const { handleToast } = useToast();
  const { auth, setAuth, setProgress } = UsePosts();
  const [visibility, setVisibility] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function handleLogin() {
    setProgress("visible");
    axios
      .post("https://tarmeezacademy.com/api/v1/login", {
        username: loginData.username,
        password: loginData.password,
      })
      .then((response) => {
        handleToast("You are logged in successfully", "success");
        handleClose();
        window.localStorage.setItem("token", response.data.token);
        window.localStorage.setItem("user", JSON.stringify(response.data.user));
        setAuth({
          token: window.localStorage.getItem("token"),
          user: JSON.parse(window.localStorage.getItem("user")),
        });
      })
      .catch((error) => {
        handleToast(error.response.data.message, "error");
      })
      .finally(() => {
        setProgress("hidden");
      });
  }
  return (
    <>
      <Button
        sx={{ color: "white", fontWeight: "bold" }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        login
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>login</DialogTitle>
        <DialogContent>
          <DialogContentText>Its quick and easy.</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="username"
            name="username"
            label="username"
            type="username"
            fullWidth
            variant="standard"
            value={loginData.username}
            onChange={(event) => {
              setLoginData({
                ...loginData,
                username: event.target.value,
              });
            }}
          />

          <div className="password">
            <TextField
              autoFocus
              required
              margin="dense"
              id="password"
              name="password"
              label="password"
              type={visibility ? "text" : "password"}
              fullWidth
              variant="standard"
              value={loginData.password}
              onChange={(event) => {
                setLoginData({
                  ...loginData,
                  password: event.target.value,
                });
              }}
            />
            <div className="password-icon">
              {visibility ? (
                <VisibilityOffIcon
                  onClick={() => {
                    setVisibility(false);
                  }}
                />
              ) : (
                <VisibilityIcon
                  onClick={() => {
                    setVisibility(true);
                  }}
                />
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleLogin}>
            login
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
