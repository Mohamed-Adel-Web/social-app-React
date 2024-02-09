/** @format */
import { useEffect } from "react";
import { UsePosts } from "../contaxt/PostsContext";
import axios from "axios";
import Post from "./Post";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import CreatePost from "./CreatePost";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";
import Avatar from "@mui/material/Avatar";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import AddComment from "./AddComment";
let postsList = [];
let userId = "";
export default function Profile() {
  const [value, setValue] = useState(0);
  const [profile, setProfile] = useState({ name: "", image: "" });
  const { currentPosts, dispatch, auth, setProgress, setComments } = UsePosts();
  const { profileId } = useParams();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function getComments(id) {
    axios
      .get(`https://tarmeezacademy.com/api/v1/posts/${id}`)
      .then((response) => {
        setComments(response.data.data.comments);
      })
      .catch((error) => {
      });
  }
  function getProfilePosts() {
    setProgress("visible");

    axios
      .get(`https://tarmeezacademy.com/api/v1/users/${profileId}/posts`)
      .then((response) => {
        dispatch({ type: "fetchSuccessProfile", payload: response.data.data });
      })
      .catch(function (error) {
        dispatch({ type: "fetchFailProfile", payload: error });
      })
      .finally(() => {
        setProgress("hidden");
      });
  }
  function getProfileInfo() {
    setProgress("visible");
    axios
      .get(`https://tarmeezacademy.com/api/v1/users/${profileId}`)
      .then((response) => {
        setProfile({
          name: response.data.data.name,
          image: response.data.data.profile_image,
        });
      })
      .catch(function (error) {})
      .finally(() => {
        setProgress("hidden");
      });
  }
  if (auth.user != null) {
    userId = auth.user.id;
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    getProfilePosts();
    getProfileInfo();
  }, [profileId]);
  if (currentPosts != null && currentPosts.data != []) {
    postsList = currentPosts.postsData.map((post) => {
      return (
        <Post
          key={post.id}
          data={post}
          loading={currentPosts.IsLoading}
          getComments={getComments}
        />
      );
    });
  }
  return (
    <>
      {" "}
      <div
        style={{
          margin: "1rem  auto",
          boxShadow: "0 3px 3px rgb(0,0,0,0.4)",
        }}
      >
        <Container maxWidth="md" style={{ textAlign: "center" }}>
          <Box
            className="user"
            sx={{
              display: { md: "flex" },
              justifyContent: "space-between",
              alignItems: "end",
              paddingBottom: "1.5rem",
              borderBottom: "1px solid #bdbdbd",
              flexWrap: "wrap",
            }}
          >
            <Box
              className="user-info"
              sx={{ display: { md: "flex" }, alignItems: { md: "end" } }}
            >
              <div
                className="user-image"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={`${profile.image}`}
                  sx={{ width: 150, height: 150 }}
                />
              </div>
              <div
                className="user-name"
                style={{
                  fontWeight: "bold",
                  marginLeft: "1rem",
                  fontSize: "2rem",
                  marginBottom: "1.5rem",
                }}
              >
                {profile.name}
              </div>
            </Box>
            <div className="user-Buttons" style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                style={{ fontWeight: "bold" }}
                startIcon={<PersonAddIcon />}
              >
                Add freind
              </Button>
              <Button
                variant="contained"
                style={{
                  marginLeft: "1rem",
                  backgroundColor: "#eeee",
                  color: "black",
                  fontWeight: "bold",
                }}
                startIcon={<ChatBubbleIcon />}
              >
                message
              </Button>
            </div>
          </Box>
          <Box
            className="tabs"
            style={{}}
            sx={{
              display: "flex",
              justifyContent: { md: "left", xs: "center" },
              marginTop: "0.5rem",
              textAlign: "left",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="scrollable prevent tabs example"
            >
              <Tab label="Posts" style={{ fontWeight: "bold" }} />
              <Tab label="About" disabled style={{ fontWeight: "bold" }} />
              <Tab label="Friends" disabled style={{ fontWeight: "bold" }} />
              <Tab label="Photos" disabled style={{ fontWeight: "bold" }} />
              <Tab label="Videos" disabled style={{ fontWeight: "bold" }} />
            </Tabs>
          </Box>
        </Container>
      </div>
      <Container maxWidth="md">
        {postsList}
        <EditPost getPosts={getProfilePosts} />
        {profileId == userId ? <CreatePost getPosts={getProfilePosts} /> : ""}
        <DeletePost getPosts={getProfilePosts} />
        <AddComment getPosts={getProfilePosts} getComments={getComments} />
      </Container>
    </>
  );
}
