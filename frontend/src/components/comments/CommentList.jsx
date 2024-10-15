import "./comment-list.css";
import UpdateCommentModal from "./UpdateCommentModal";
import swal from "sweetalert";
import * as Icon from "react-bootstrap-icons";
import { useState } from "react";
import Moment from "react-moment"
import {useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/apiCalls/commentApiCall";


const CommentList = ({comments}) => {
  const [updateComment, setUpdateComment] = useState(false);
  const [commentForUpdate, setCommentForUpdate] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch()
  
  // Upfate Comment Handler
  const updateCommentHandler = (comment)=>{
    setCommentForUpdate(comment)
    setUpdateComment(true)
  }

  // Delete Comment Handler
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteComment(commentId))
      } 
    });
  };

  return (
    <div className="comment-list">
      <h4 className="comment-list-count">{comments?.length} Comments</h4>
      {comments?.map((comment) => (
        <div key={comment._id} className="comment-item">
          
          <div className="comment-item-info">
            <div className="comment-item-user-info">
              <span className="comment-item-username">{comment.username }</span>
            </div>
            <div className="comment-item-time">
              <Moment fromNow ago>
                {comment.createdAt}
              </Moment>{" "}ago
            </div>
          </div>
          
          <p className="comment-item-text">{comment.text}</p>
          
          {
            user?._id === comment.user && (
                <div className="comment-item-icon-wrapper">
                  <Icon.PencilSquare
                      className="icon"
                      onClick={() => updateCommentHandler(comment)}
                  />
                  <Icon.TrashFill
                      className="icon"
                      onClick={() => deleteCommentHandler(comment?._id)}
                  />
                </div>
            )
          }
        </div>
      ))}
      {updateComment && (
        <UpdateCommentModal
          setUpdateComment={setUpdateComment}
          commentForUpdate={commentForUpdate}
        />
      )}
    </div>
  );
};

export default CommentList;
