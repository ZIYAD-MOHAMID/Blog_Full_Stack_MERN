import { postActions } from "../slices/postSlice";
import { commentActions } from "../slices/commentSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Create Comment
export function createComment(newComment) {
  return async (dispatch, getState) => {
    try {
      const res = await request.post(
        "/api/comments",
        { ...newComment },
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(postActions.addCommentToPost(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Update Comment
export function updateComment(commentId, comment) {
  return async (dispatch, getState) => {
    try {
      const res = await request.put(`/api/comments/${commentId}`, comment, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(postActions.upfateCpmmentPost(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Delete Comment
export function deleteComment(commentId) {
  return async (dispatch, getState) => {
    try {
      await request.delete(`/api/comments/${commentId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(commentActions.deleteComment(commentId));
      dispatch(postActions.deleteCommentPost(commentId));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Fetch All Comments
export function fetchAllComments(commentId) {
  return async (dispatch, getState) => {
    try {
      const res = await request.get(`/api/comments`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(commentActions.setComments(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
