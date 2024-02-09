/** @format */
import { Container } from "@mui/material";
import Post from "./Post";
import { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import { UsePosts } from "../contaxt/PostsContext";
import axios from "axios";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";
import CircularProgress from "@mui/material/CircularProgress";
import AddComment from "./AddComment";
let postsList = [];
export default function PostList() {
  const {
    currentPosts,
    dispatch,
    setComments,
    targetPost,
    progress,
    setProgress,
  } = UsePosts();
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  window.onscroll = function () {
    if (
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight &&
      currentPage <= lastPage
    ) {
      setCurrentPage((currentPage) => currentPage + 1);
    }
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
  function getPosts() {
    setProgress("visible");
    axios
      .get(`https://tarmeezacademy.com/api/v1/posts?limit=30&page=1`)
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
  useEffect(() => {
    setProgress("visible");
    const controller = new AbortController();
    axios
      .get(
        `https://tarmeezacademy.com/api/v1/posts?limit=30&page=${currentPage}`,
        {
          signal: controller.signal,
        }
      )
      .then((response) => {
        dispatch({ type: "fetchSuccess", payload: response.data.data });
        setLastPage(response.data.meta.last_page);
      })
      .catch(function (error) {
        dispatch({ type: "fetchFail", payload: error });
      })
      .finally(() => {
        setProgress("hidden");
      });

    return () => {
      controller.abort();
    };
  }, [currentPage]);
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
      <Container maxWidth="md">
        {postsList}
        <CircularProgress
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            visibility: `${progress}`,
          }}
        />
        <CreatePost getPosts={getPosts} />
        <DeletePost getPosts={getPosts} />
        <EditPost getPosts={getPosts} />
        <AddComment getComments={getComments} getPosts={getPosts} />
      </Container>
    </>
  );
}
