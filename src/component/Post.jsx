/** @format */
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Menu from "@mui/material/Menu";
import { UsePosts } from "../contaxt/PostsContext";
import { Link } from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
let userId = "";
export default function Post({ loading, data, getComments }) {
  const { auth, setTargetPost, setDeleteModal, setEditModal, setCommentModal } =
    UsePosts();
  const [likeColor, setLikeColor] = useState("#757575");
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (auth.user != null) {
    userId = auth.user.id;
  }
  function handleLikeColor() {
    likeColor == "#757575" ? setLikeColor("blue") : setLikeColor("#757575");
  }

  return (
    <Card sx={{ minWidth: 350, m: 2 }}>
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
            <Link to={`/users/${data.author.id}`}>
              <Avatar alt="Ted talk" src={`${data.author.profile_image}`} />
            </Link>
          )
        }
        action={
          data.author.id != userId || auth.user == null ? null : (
            <>
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem color="primary" onClick={handleClose}>
                    <Button
                      variant="contained"
                      style={{ width: "10rem" }}
                      startIcon={<EditIcon />}
                      onClick={() => {
                        setTargetPost(data);
                        setEditModal({
                          open: true,
                          title: data.title,
                          body: data.body,
                          image: data.image,
                        });
                      }}
                    >
                      Edit Post
                    </Button>{" "}
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Button
                      style={{
                        color: "white",
                        background: "#b71c1c",
                        width: "10rem",
                      }}
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        setTargetPost(data);
                        setDeleteModal(true);
                      }}
                    >
                      Delete Post
                    </Button>
                  </MenuItem>
                </Menu>
              </div>
            </>
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
            `${data.author.username}`
          )
        }
        subheader={
          loading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            `${data.created_at}`
          )
        }
      />
      {loading ? (
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      ) : (
        <>
          <div style={{ margin: "0.5rem" }}> {data.title}</div>
          <CardMedia
            component="img"
            height="400"
            image={`${data.image}`}
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
          <Typography variant="body2" color="text.secondary" component="p">
            {data.body}
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
        {data.comments_count}
        <ChatBubbleIcon
          style={{
            color: " #757575",
            fontSize: "1.5rem",
            marginLeft: "0.3rem",
          }}
        />
      </Box>
      {auth.user != null ? (
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
            startIcon={<ThumbUpAltIcon style={{ color: `${likeColor}` }} />}
            onClick={handleLikeColor}
          >
            Like
          </Button>
          <Button
            style={{ color: " #757575", fontWeight: "bold" }}
            startIcon={
              <ChatBubbleOutlineOutlinedIcon style={{ color: " #757575" }} />
            }
            onClick={() => {
              getComments(data.id);
              setTargetPost(data);
              setCommentModal(true);
            }}
          >
            Comment
          </Button>
          <Button
            style={{ color: " #757575", fontWeight: "bold" }}
            startIcon={
              <ReplyOutlinedIcon
                style={{ transform: "rotate(180deg)", color: " #757575" }}
              />
            }
          >
            share
          </Button>
        </Box>
      ) : (
        ""
      )}
    </Card>
  );
}
