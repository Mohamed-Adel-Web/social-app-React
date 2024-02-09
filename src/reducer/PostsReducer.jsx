/** @format */

export default function PostsReducer(currentPosts, { type, payload }) {
  switch (type) {
    case "fetchSuccess": {
      const postsStatus = {
        IsLoading: false,
        postsData: [...currentPosts.postsData, ...payload],
        errorMessage: "",
      };
      return postsStatus;
    }
    case "fetchFail": {
      const postsStatus = {
        IsLoading: true,
        postsData: [],
        errorMessage: payload.message,
      };
      return postsStatus;
    }
    case "fetchSuccessProfile": {
      const postsStatus = {
        IsLoading: false,
        postsData: payload,
        errorMessage: "",
      };
      return postsStatus;
    }
    case "fetchFailProfile": {
      const postsStatus = {
        IsLoading: true,
        postsData: [],
        errorMessage: payload.message,
      };
      return postsStatus;
    }
  }
}
