import "./update-comment-modal.css";
import * as Icon from "react-bootstrap-icons"
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateComment } from "../../redux/apiCalls/commentApiCall";

const UpdateCommentModal = ({ setUpdateComment,commentForUpdate }) => {
  const dispatch = useDispatch()

  const [text, setText] = useState(commentForUpdate?.text);
  
  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if(text.trim() === "") return toast.error("Please write something")

    dispatch(updateComment(
      commentForUpdate?._id,
      { text }
    ))
    setUpdateComment(false)
  };

  return (
    <div className="update-comment">
      <form onSubmit={formSubmitHandler} className="update-comment-form">
        <abbr title="close">
          <Icon.XCircleFill
            onClick={() => setUpdateComment(false)}
            className=" update-comment-form-close"
          />
        </abbr>
        <h1 className="update-comment-title">Edit Comment</h1>
        <input
          onChange={(e) => setText(e.target.value)}
          value={text}
          type="text"
          className="update-comment-input"
          placeholder="Update Comment"
        />
        <button type="submit" className="update-comment-btn">
          Edit Comment
        </button>
      </form>
    </div>
  );
};

export default UpdateCommentModal;

