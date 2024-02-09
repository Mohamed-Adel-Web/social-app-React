/** @format */

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { UsePosts } from "../contaxt/PostsContext";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import axios from "axios";
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
export default function EditPost({ getPosts, getProfilePosts }) {
  const {
    editModal,
    setEditModal,
    auth,
    targetPost,
    setProgress,
    setTargetPost,
  } = UsePosts();
  const { handleToast } = useToast();
  const handleClose = () => {
    setEditModal({ ...editModal, open: false });
  };
  function handleEditConfirm() {
    setProgress("visible");
    let formData = new FormData();
    formData.append("body", editModal.body);
    formData.append("title", editModal.title);
    formData.append("image", editModal.image);
    formData.append("_method", "put");
    axios
      .post(
        `https://tarmeezacademy.com/api/v1/posts/${targetPost.id}`,
        formData,
        {
          headers: { authorization: `Bearer ${auth.token}` },
        }
      )
      .then((response) => {
        handleToast("The Post has been updated successfully ", "info");
        getPosts();
        handleClose();
        getProfilePosts();
        setTargetPost(null);
      })
      .catch((error) => {
        handleToast(error.response.data.message, "error");
      });
  }
  return (
    <>
      {" "}
      <Dialog
        open={editModal.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="post title edit"
            name="post title edit"
            label="post title"
            type="text"
            fullWidth
            variant="standard"
            value={editModal.title}
            onChange={(event) => {
              setEditModal({ ...editModal, title: event.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="post body edit"
            name="post body edit"
            label="post body"
            type="text"
            fullWidth
            variant="standard"
            value={editModal.body}
            onChange={(event) => {
              setEditModal({ ...editModal, body: event.target.value });
            }}
          />
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            style={{ marginTop: "2rem" }}
          >
            change photo
            <VisuallyHiddenInput
              type="file"
              src={editModal.image}
              onChange={(event) => {
                setEditModal({ ...editModal, image: event.target.files[0] });
              }}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleEditConfirm}>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
