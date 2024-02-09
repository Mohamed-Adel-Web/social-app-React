/** @format */
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { UsePosts } from "../contaxt/PostsContext";
import { useState } from "react";
import { useToast } from "../contaxt/ToastContext";
import axios from "axios";
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
export default function CreatePost({ getPosts, getProfilePosts }) {
  const { auth, setProgress } = UsePosts();
  const [open, setOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", body: "", image: "" });
  const { handleToast } = useToast();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function handleAddPost() {
    setProgress("visible");
    let formData = new FormData();
    formData.append("body", newPost.body);
    formData.append("title", newPost.title);
    formData.append("image", newPost.image);
    axios
      .post("https://tarmeezacademy.com/api/v1/posts", formData, {
        headers: { authorization: `Bearer ${auth.token}` },
      })
      .then((response) => {
        handleToast("Post has been added successfully", "success");
        handleClose();
        getPosts();
        getProfilePosts();
      })
      .catch((error) => {
        handleToast(error.response.data.message, "error");
      })

  }
  if (auth.user != null) {
    return (
      <>
        <Tooltip
          title="add new post"
          style={{ position: "fixed", bottom: "2rem", right: "1rem" }}
        >
          <PostAddIcon
            className="add-post"
            sx={{
              margin: "2rem",
              padding: "1rem",
              boxShadow: "0 10px 10px rgb(0,0,0,0.6)",
              background: "#e0e0e0",
              borderRadius: "50%",
              color: "black",
              fontSize: "4rem",
              cursor: "pointer",
            }}
            onClick={handleClickOpen}
          />
        </Tooltip>
        <Dialog fullWidth open={open} onClose={handleClose}>
          <DialogTitle> Create Post</DialogTitle>
          <DialogContent>
            <DialogContentText>
              whats on your mind, {auth.user.name}?.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="post Title"
              name="post Title"
              label="post Title"
              type="text"
              fullWidth
              variant="standard"
              value={newPost.title}
              onChange={(event) => {
                setNewPost({ ...newPost, title: event.target.value });
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="post Body"
              name="post Body"
              label="post Body"
              type="text"
              fullWidth
              variant="standard"
              value={newPost.body}
              onChange={(event) => {
                setNewPost({ ...newPost, body: event.target.value });
              }}
            />
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              style={{ marginTop: "2rem" }}
            >
              Add photo
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => {
                  setNewPost({ ...newPost, image: event.target.files[0] });
                }}
              />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={handleAddPost}>
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  } else {
    return "";
  }
}
