/** @format */
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { UsePosts } from "../contaxt/PostsContext";
import { useToast } from "../contaxt/ToastContext";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export default function Register() {
  const [open, setOpen] = useState(false);
  const { handleToast } = useToast();
  const { setAuth, setProgress } = UsePosts();
  const [visibility, setVisibility] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [registerData, setRegisterData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    image: null,
  });
  function handleRegister() {
    setProgress("visible");
    let formData = new FormData();
    formData.append("name", registerData.name);
    formData.append("username", registerData.username);
    formData.append("image", registerData.image);
    formData.append("password", registerData.password);
    axios
      .post("https://tarmeezacademy.com/api/v1/register", formData)
      .then((response) => {
        handleToast("A new account has been created successfully", "success");

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
      <Box>
        <Button
          sx={{ color: "white", fontWeight: "bold" }}
          variant="outlined"
          onClick={handleClickOpen}
        >
          Register
        </Button>
      </Box>{" "}
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Sign Up</DialogTitle>
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
            value={registerData.username}
            onChange={(event) => {
              setRegisterData({
                ...registerData,
                username: event.target.value,
              });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="name"
            type="name"
            fullWidth
            variant="standard"
            value={registerData.name}
            onChange={(event) => {
              setRegisterData({ ...registerData, name: event.target.value });
            }}
          />{" "}
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={registerData.email}
            onChange={(event) => {
              setRegisterData({ ...registerData, email: event.target.value });
            }}
          />{" "}
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
              value={registerData.password}
              onChange={(event) => {
                setRegisterData({
                  ...registerData,
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
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            style={{ marginTop: "2rem" }}
          >
            Upload your profile image
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => {
                setRegisterData({
                  ...registerData,
                  image: event.target.files[0],
                });
              }}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleRegister}>
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
