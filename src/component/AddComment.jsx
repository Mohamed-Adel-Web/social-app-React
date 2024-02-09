/** @format */

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import CardHeader from "@mui/material/CardHeader";
import Tooltip from "@mui/material/Tooltip";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import { UsePosts } from "../contaxt/PostsContext";
import { useState } from "react";
import axios from "axios";
let commentsList = [];
let targeID = "";
export default function AddComment({ getComments, getPosts }) {
  const [likeColor, setLikeColor] = useState("#757575");
  const [commentInput, setCommentInput] = useState("");
  const loading = false;
  const {
    targetPost,
    setTargetPost,
    commentModal,
    setCommentModal,
    comments,
    auth,
    setProgress,
  } = UsePosts();
  function handleLikeColor() {
    likeColor == "#757575" ? setLikeColor("blue") : setLikeColor("#757575");
  }
  const handleClose = () => {
    setTargetPost(null);
    setCommentModal(false);
  };
  function sendComment() {
    targeID = targetPost.id;
    setProgress("visible");
    axios
      .post(
        `https://tarmeezacademy.com/api/v1/posts/${targeID}/comments`,
        { body: commentInput },
        {
          headers: {
            authorization: `Bearer ${auth.token}`,
          },
        }
      )
      .then((response) => {
        getComments(targeID);
        setCommentInput("");
        getPosts();
      })
      .catch((error) => {})
      .finally(() => {
        setProgress("hidden");
      });
  }
  if (comments.length > 0) {
    commentsList = comments.map((comment) => {
      return (
        <>
          <Box
            className="comments-info"
            sx={{
              display: "flex",
              alignItems: "flex-start",
              margin: "1rem",
            }}
          >
            {" "}
            <Link to={`/users/${comment.author.id}`}>
              <Avatar
                alt="Ted talk"
                src={`${comment.author.profile_image}`}
                sx={{ width: "30px", height: "30px" }}
              />
            </Link>
            <Box
              style={{
                background: "#eeee",
                padding: "0.5rem",
                borderRadius: "1rem",
                marginLeft: "0.5rem",
                fontSize: "0.9rem",
              }}
            >
              <Box
                className="user-name"
                sx={{ fontWeight: "bold", cursor: "pointer" }}
              >
                <Link
                  to={`/users/${comment.author.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {comment.author.name}
                </Link>
              </Box>
              {comment.body}
            </Box>
          </Box>
        </>
      );
    });
  } else {
    commentsList = "";
  }
  if (targetPost != null) {
    return (
      <React.Fragment>
        <Dialog
          open={commentModal}
          onClose={handleClose}
          scroll={"paper"}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle
            id="scroll-dialog-title "
            style={{
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
              borderBottom: "1px solid #eeee",
            }}
          >
            <div style={{ flex: "1" }}>{targetPost.author.name}&#39;s Post</div>
            <IconButton
              sx={{ background: "#eeee", borderRadius: "50%" }}
              onClick={handleClose}
            >
              <CloseIcon sx={{ color: "black" }} />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              {" "}
              <Card sx={{ width: { md: 500, xs: 360 }, m: 2 }}>
                <CardHeader
                  avatar={
                    loading ? (
                      <Skeleton
                        animation="wave"
                        variant="circular"
                        width={40}
                        height={40}
                      />
                    ) : (
                      <Link to={`/users/${targetPost.author.id}`}>
                        <Avatar
                          alt="Ted talk"
                          src={`${targetPost.author.profile_image}`}
                        />
                      </Link>
                    )
                  }
                  title={
                    loading ? (
                      <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                      />
                    ) : (
                      `${targetPost.author.username}`
                    )
                  }
                  subheader={
                    loading ? (
                      <Skeleton animation="wave" height={10} width="40%" />
                    ) : (
                      `${targetPost.created_at}`
                    )
                  }
                />
                {loading ? (
                  <Skeleton
                    sx={{ height: 190 }}
                    animation="wave"
                    variant="rectangular"
                  />
                ) : (
                  <>
                    <div style={{ margin: "0.5rem" }}> {targetPost.title}</div>
                    <CardMedia
                      component="img"
                      height="400"
                      image={`${targetPost.image}`}
                      alt="Nicola Sturgeon on a TED talk stage"
                    />
                  </>
                )}
                <CardContent>
                  {loading ? (
                    <React.Fragment>
                      <Skeleton
                        animation="wave"
                        height={10}
                        style={{ marginBottom: 6 }}
                      />
                      <Skeleton animation="wave" height={10} width="80%" />
                    </React.Fragment>
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="p"
                    >
                      {targetPost.body}
                    </Typography>
                  )}
                </CardContent>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    height: "fit-content",
                    marginRight: "3rem",
                    marginBottom: "1rem",
                  }}
                >
                  {" "}
                  {targetPost.comments_count}
                  <ChatBubbleIcon
                    style={{
                      color: " #757575",
                      fontSize: "1.5rem",
                      marginLeft: "0.3rem",
                    }}
                  />
                </Box>
                <Box
                  className="comment"
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    borderTop: "1px solid  #bdbdbd",
                    padding: "0.5rem 0",
                    width: "90%",
                    margin: "0 auto",
                  }}
                >
                  <Button
                    style={{ color: `${likeColor}`, fontWeight: "bold" }}
                    startIcon={
                      <ThumbUpAltIcon style={{ color: `${likeColor}` }} />
                    }
                    onClick={handleLikeColor}
                  >
                    Like
                  </Button>
                  <Button
                    style={{ color: " #757575", fontWeight: "bold" }}
                    startIcon={
                      <ChatBubbleOutlineOutlinedIcon
                        style={{ color: " #757575" }}
                      />
                    }
                  >
                    Comment
                  </Button>
                  <Button
                    style={{ color: " #757575", fontWeight: "bold" }}
                    startIcon={
                      <ReplyOutlinedIcon
                        style={{
                          transform: "rotate(180deg)",
                          color: " #757575",
                        }}
                      />
                    }
                  >
                    share
                  </Button>
                </Box>
              </Card>
            </DialogContentText>
            {commentsList}
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "start",
              padding: "2rem 1rem",
              boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
              position: "relative",
            }}
          >
            <Link to={`/users/${auth.user.id}`}>
              <Avatar
                alt="Ted talk"
                src={`${auth.user.profile_image}`}
                sx={{ width: "30px", height: "30px" }}
              />
            </Link>
            <TextField
              id="outlined-textarea"
              label="Write a comment..."
              placeholder="Write a comment..."
              multiline
              className="add-comment"
              rows={2}
              sx={{ width: "90%", background: "#eeee" }}
              value={commentInput}
              onChange={(event) => {
                setCommentInput(event.target.value);
              }}
            />
            <Tooltip title="send" sx={{ width: "0.3rem" }}>
              <SendIcon
                sx={{
                  color: commentInput == "" ? "gray" : "blue",
                  cursor: commentInput == "" ? "not-allowed" : "pointer",
                  position: "absolute",
                  right: "3rem",
                  bottom: "3rem",
                  fontSize: "1rem",
                }}
                onClick={sendComment}
              />
            </Tooltip>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  } else {
    return "";
  }
}
