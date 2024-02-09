/** @format */
import { useReducer, useContext, createContext, useState } from "react";
import PostsReducer from "../reducer/PostsReducer";
const PostsContext = createContext({});
export default function PostsProvider({ children }) {
  const [currentPosts, dispatch] = useReducer(PostsReducer, null);
  const [auth, setAuth] = useState({ token: "", user: null });
  const [targetPost, setTargetPost] = useState(null);
  const [editModal, setEditModal] = useState({
    open: false,
    title: "",
    body: "",
    image: "",
  });
  const [deleteModal, setDeleteModal] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [progress, setProgress] = useState("hidden");
  return (
    <PostsContext.Provider
      value={{
        currentPosts: currentPosts,
        dispatch: dispatch,
        auth: auth,
        setAuth: setAuth,
        targetPost: targetPost,
        setTargetPost: setTargetPost,
        editModal: editModal,
        deleteModal: deleteModal,
        setDeleteModal: setDeleteModal,
        setEditModal: setEditModal,
        commentModal: commentModal,
        setCommentModal: setCommentModal,
        comments: comments,
        setComments: setComments,
        progress: progress,
        setProgress: setProgress,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}
export const UsePosts = () => {
  return useContext(PostsContext);
};
