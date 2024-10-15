import request from "../../utils/request";
import { toast } from "react-toastify";
import { postActions } from "../slices/postSlice";

//Fetch Posts Based on Page Number
export function fetchPosts(pageNumber) {
  return async (dispatch) => {
    try {
      const res = await request.get(`/api/posts?pageNumber=${pageNumber}`);
      dispatch(postActions.setPosts(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

//Get Posts Count
export function getPostsCount() {
  return async (dispatch) => {
    try {
      const res = await request.get(`/api/posts/count`);
      dispatch(postActions.setPostsCount(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

//Fetch Posts Based on Category
export function fetchPostsBasedOnCategory(category) {
  return async (dispatch) => {
    try {
      const res = await request.get(`/api/posts?category=${category}`);
      dispatch(postActions.setPostsCate(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

//Create Post
export function createPost(newPost) {
  return async (dispatch, getState) => {
    try {
      dispatch(postActions.setLoading());
      await request.post(`/api/posts`, newPost, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(postActions.setIsPostCreated());
      setTimeout(() => dispatch(postActions.clearIsPostCreated()), 2000);
    } catch (error) {
      dispatch(postActions.clearLoading());
      toast.error(error.response.data.message);
    }
  };
}

// Fetch Single Post
export function fetchSinglePost(postId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/${postId}`);
      dispatch(postActions.setPost(data));
      console.log(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Toggle Like Post
export function toggleLikePost(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/posts/like/${postId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(postActions.setLike(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Update Post Image
export function updatePostImage(newImage, postId) {
  return async (dispatch, getState) => {
    try {
      await request.put(`/api/posts/upload-image/${postId}`, newImage, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("New post image uploaded successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Update Post
export function updatePost(newPost, postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/posts/${postId}`, newPost, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(postActions.setPost(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Delete Post
export function deletePost(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/posts/${postId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(postActions.deletePost(data.postId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Get All Posts
export function getAllPosts() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts`);
      dispatch(postActions.setPosts(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
