import "./update-post-modal.css";
import * as Icon from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    useDispatch,
    useSelector
} from "react-redux";
import { updatePost } from "../../redux/apiCalls/postApiCall";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

const UpdatePostModal = ({ setUpdatePost, post }) => {
  const dispatch = useDispatch();
      const {categories} = useSelector(state => state.category)


  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [category, setCategory] = useState(post.category);

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    
    if(title.trim() === "") return toast.error('title required');
    if(category.trim() === "") return toast.error('category required');
    if(description.trim() === "") return toast.error('description required');

    dispatch(updatePost({ title, category, description }, post?._id));
    setUpdatePost(false);
  };

      useEffect(() => {
        dispatch(fetchCategories())
    },[])

  return (
    <div className="update-post">
      <form onSubmit={formSubmitHandler} className="update-post-form">
        <abbr title="close">
          <Icon.XCircleFill
            onClick={() => setUpdatePost(false)}
            className="update-post-form-close"
          />
        </abbr>
        <h1 className="update-post-title">Update Post</h1>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          className="update-post-input"
        />
        <select
          className="update-post-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">
            Select A Category
          </option>
          {
            categories.map(category => 
              <option
                key={category._id}
                value={category.title}
              >
                {category.title}
              </option>
            )
          }
        </select>
        <textarea
          className="update-post-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="5"
        ></textarea>
        <button type="submit" className="update-post-btn">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePostModal;
 