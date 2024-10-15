import "./post-details.css"
import * as Icon from "react-bootstrap-icons"
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import swal from "sweetalert";
import UpdatePostModal from "../../components/comments/UpdatePostModal";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    toggleLikePost,
    fetchSinglePost,
    deletePost,
    updatePostImage
} from "../../redux/apiCalls/postApiCall";

const PostDetais = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch();
    const { post } = useSelector((state) => state.post);
    const { user } = useSelector((state) => state.auth);

    const { id } = useParams()
    
    const [file, setfile] = useState(null)
    const [updatePost, setUpdatePost] = useState(false);


    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchSinglePost(id));           
    }, [id]);

    
    const updateImageSubmitHandler = (e) => {
        e.preventDefault()
        if(!file)return toast.warning("There is mo file!")
        const formData = new FormData();
        formData.append("image", file);
        dispatch(updatePostImage(formData,post?._id));
    };

    // Delete Post Handler
    const deletePostHandler = () => {
        swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this post!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        }).then((willDelete) => {
        if (willDelete) {
            dispatch(deletePost(post?._id))
            navigate(`/profile/${user?._id}`)
        }
        });
    };

    const likeHandler = () => { 
        dispatch(toggleLikePost(post?._id))
        window.location.reload()
    }

    return ( 
        <section className="post-details">
            <div className="post-details-image-wrapper">
                <img
                    src={
                        file ? URL.createObjectURL(file) : post?.image.url
                    }
                    alt=""
                    className="post-details-image"
                />
                {
                    user?._id === post?.user?._id && (
                        <form onSubmit={updateImageSubmitHandler} className="update-post-image-form">
                            <label htmlFor="file" className="update-post-label">
                                <Icon.ImageFill className="image-Fill"/>
                                Select new image
                            </label>
                            <input
                                style={{ display: "none" }}
                                type="file" name="file"
                                id="file"
                                onChange={(e) => setfile(e.target.files[0])}
                            />
                            <button type="submit">Upload</button>
                        </form>
                    )
                }
            </div>
            <h1 className="post-details-title">{post?.title}</h1>
            <div className="post-details-user-info">
                <img src={post?.user.profilePhoto?.url} className="post-details-user-img" alt="" />
                <div className="post-details-user">
                    <strong>
                        <Link to={`/profile/${post?.user._id}`}>{post?.user.username}</Link>
                    </strong>
                    <span>{new Date(post?.createdAt).toDateString()}</span>
                </div>
            </div>
            <p className="post-details-description">
                {post?.description}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam qui in aspernatur similique itaque animi obcaecati assumenda ipsa non asperiores, minima amet nemo odio veniam. Odit debitis laudantium nobis fugit.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam qui in aspernatur similique itaque animi obcaecati assumenda ipsa non asperiores, minima amet nemo odio veniam. Odit debitis laudantium nobis fugit.
            </p>
            <div className="post-details-icon-wrapper">
                <div>
                    {
                        user && (
                            <div
                                onClick={likeHandler}
                            >
                                {
                                    post?.likes.includes(user?._id)?
                                        <Icon.HandThumbsUpFill
                                            className="icon"
                                        />
                                        :
                                        <Icon.HandThumbsUp
                                            className="icon"
                                        />
                                    
                                }
                            </div>
                        )
                    }
                    <small>{post?.likes.length} likes</small>
                </div>
                {
                    user?._id === post?.user?._id && (
                        <div>
                            <Icon.PencilSquare
                                className="pencil-square icon"
                                onClick={() => setUpdatePost(true)}
                            />
                            <Icon.TrashFill
                                onClick={deletePostHandler}
                                className="trash-fill icon" />
                        </div>
                    )
                }
            </div>
            {
                user ? 
                <AddComment postId={post?._id} />
                    :
                    <p className="post-details-info-write">
                        to write a comment you should login first
                    </p>
            }
            <CommentList comments={post?.comments} />
            {updatePost && (
                <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />
            )}
        </section>
     );
}
   
export default PostDetais;