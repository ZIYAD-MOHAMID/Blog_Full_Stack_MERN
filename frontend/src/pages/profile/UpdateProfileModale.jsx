import * as Icon from "react-bootstrap-icons"
import "./update-profile-modal.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/apiCalls/profileApiCall";


const UpdateProfileModal = ({ setUpdateProfile, profile }) => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio);
  const [password, setPassword] = useState("");

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    const updatedUser = { username, bio };
    if (password.trim() !== "") {
      updatedUser.password = password;
    }
    dispatch(updateProfile(profile?._id, updatedUser))
    setUpdateProfile(false)
  };

  return (
    <div className="update-profile">
      <form onSubmit={formSubmitHandler} className="update-profile-form">
        <abbr title="close">
          <Icon.XCircleFill
            onClick={() => setUpdateProfile(false)}
            className="update-profile-form-close"
          ></Icon.XCircleFill>
        </abbr>
        <h1 className="update-profile-title">Update Your Profile</h1>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          className="update-profile-input"
          placeholder="Username"
        />
        <input
          onChange={(e) => setBio(e.target.value)}
          value={bio}
          type="text"
          className="update-profile-input"
          placeholder="Bio"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="update-profile-input"
          placeholder="Password"
        />
        <button type="submit" className="update-profile-btn">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileModal;