/** @format */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { UsePosts } from "../contaxt/PostsContext";
import { useToast } from "../contaxt/ToastContext";
import axios from "axios";
export default function DeletePost({ getPosts}) {
  const {
    deleteModal,
    setDeleteModal,
    auth,
    targetPost,
    setProgress,
    setTargetPost
  } = UsePosts();
  const { handleToast } = useToast();

  const handleClose = () => {
    setDeleteModal(false);
  };
  function handleDeleteConfirm() {
    setProgress("visible");
    axios
      .delete(`https://tarmeezacademy.com/api/v1/posts/${targetPost.id}`, {
        headers: { authorization: `Bearer ${auth.token}` },
      })
      .then((response) => {
        handleToast("Post has been deleted successfully ", "error");
        getPosts();
        setTargetPost(null)
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
      {" "}
      <Dialog
        open={deleteModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle style={{ color: "#b71c1c" }} id="alert-dialog-title">
          Delete Post
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this post ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: "#b71c1c" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            style={{ color: "#b71c1c" }}
            onClick={() => {
              handleClose();
              handleDeleteConfirm();
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
