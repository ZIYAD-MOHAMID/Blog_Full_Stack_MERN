import * as Icon from "react-bootstrap-icons"
import "./profile.css"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import swal from "sweetalert";
import UpdateProfileModal from "./UpdateProfileModale";
import { useDispatch,useSelector } from "react-redux";
import { deleteProfile, getUserProfile, uploadProfilePhoto } from "../../redux/apiCalls/profileApiCall";
import { useParams, useNavigate } from "react-router-dom";
import PostItem from "../../components/posts/PostItem";
import { Oval } from "react-loader-spinner";
import { logoutUser } from "../../redux/apiCalls/authApiCall"

const Profile = () => {
    const [file, setFile] = useState(null)
    const [updateProfile, setUpdateProfile] = useState(false)

    const dispatch = useDispatch()
    const {profile,loading,isProfileDeleted} = useSelector(state =>state.profile)
    const {user} = useSelector(state =>state.auth)

    const { id } = useParams()
    useEffect((e) => {
        dispatch(getUserProfile(id))        
        window.scrollTo(0, 0)
    }, [id])

    const navigate = useNavigate();
    useEffect(() => {
        if(isProfileDeleted) {
            navigate("/");
        }
    }, [navigate, isProfileDeleted]);
    
    const formSubmitHandler = (e) => {
        e.preventDefault()
        if (!file) return toast.warning("ther is no file!") 
        const formData = new FormData()
        formData.append("image", file)
        dispatch(uploadProfilePhoto(formData))
    }

    // Delete Account Handler
    const deleteAccountHandler = () => {
        swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover profile!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        }).then((isOk) => {
        if (isOk) {
            dispatch(deleteProfile(user?._id));
            dispatch(logoutUser());
        }
        });
    };

    if(loading) {
        return (
            <div className="profile-loader">
                <Oval
                    height={120}
                    width={120}
                    color="#000"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="grey"
                    strokeWidth={3}
                    strokeWidthSecondary={3}
                />
            </div>
    )}

    return ( 
        <section className="profile">
            <div className="profile-header">
                <div className="profile-image-wrapper">
                    <img
                        className="profile-image"
                        src={file? URL.createObjectURL(file): profile?.profilePhoto.url}
                        alt=""
                    />
                    {
                        user?._id === profile?._id &&
                            (<form onSubmit={formSubmitHandler}>
                                <abbr title="choose profile photo">
                                    <label
                                        htmlFor="file"
                                        className="upload-profile-photo-icon"
                                    >
                                        <Icon.CameraFill/>
                                    </label>
                                </abbr>
                                <input onChange={(e) => setFile(e.target.files[0])} style={{display:"none"}} type="file" name="file" id="file" />
                                <button className="upload-profil-photo-btn" type="submit">
                                    Upload
                                </button>
                            </form>)
                    }
                </div>
                <h1 className="profile-username">{ profile?.username}</h1>
                <p className="profile-bio">
                    {profile?.bio}
                </p>
                <div className="user-date-joined">
                    <strong>Date Joined:</strong>
                    <span>{new Date(profile?.createdAt).toDateString()}</span>
                </div>
                {
                    user?._id === profile?._id && (
                        <button onClick={() => setUpdateProfile(true)} className="profile-update-btn">
                            <Icon.FilePersonFill />
                            Update Profile
                        </button>
                    )
                }
            </div>
            <div className="profile-posts-list">
                <h2 className="title">{profile?.username} Posts</h2>
                {profile?.posts?.map(post =>
                    <PostItem
                        key={post._id}
                        post={post}
                        username={profile?.username}
                        userId={profile?._id}
                    />
                )}
            </div>
            {
                user?._id === profile?._id && (
                    <button
                        onClick={deleteAccountHandler}
                        className="delete-account-btn"
                    >
                        Delete your Account
                    </button>
            )}

            {updateProfile &&
                <UpdateProfileModal
                    profile={profile}
                    setUpdateProfile={setUpdateProfile}
                />
            }
        </section>
     );
}
 
export default Profile;