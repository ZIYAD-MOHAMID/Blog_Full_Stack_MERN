import request from "../../utils/request";
import { toast } from "react-toastify";
import { profileActions } from "../slices/profileSlice";
import { authActions } from "../slices/authSlice";

//Get User Profile
export function getUserProfile(userID) {
  return async (dispatch) => {
    try {
      const res = await request.get(`/api/users/profile/${userID}`);
      dispatch(profileActions.setProfile(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

//Uploud User Photo
export function uploadProfilePhoto(newPhoto) {
  return async (dispatch, getState) => {
    try {
      const res = await request.post(
        `/api/users/profile/profile-photo-upload`,
        newPhoto,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(profileActions.setProfilePhoto(res.data.profilePhoto));
      dispatch(authActions.setUserPhoto(res.data.profilePhoto));
      toast.success(res.data.message);

      //modify the user in local storage with new photo
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.profilePhoto = res.data?.profilePhoto;
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

//Update Profile
export function updateProfile(userId, profile) {
  return async (dispatch, getState) => {
    try {
      const res = await request.put(`/api/users/profile/${userId}`, profile, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(profileActions.updateProfile(res.data));
      dispatch(authActions.setUsername(res.data.username));

      //modify the user in local storage with new username
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.username = res.data?.username;
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Delete Profile (Account)
export function deleteProfile(userId) {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading());
      const res = await request.delete(`/api/users/profile/${userId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(profileActions.setIsProfileDeleted());
      toast.success(res.data?.message);
      setTimeout(() => dispatch(profileActions.clearIsProfileDeleted()), 2000);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(profileActions.clearLoading());
    }
  };
}

// Get Users Count (for admin dashboad)
export function getUsersCount() {
  return async (dispatch, getState) => {
    try {
      const res = await request.get(`/api/users/count`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(profileActions.setUserCount(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Get All Users Profile (for admin dashboad)
export function getAllUsersProfile() {
  return async (dispatch, getState) => {
    try {
      const res = await request.get(`/api/users/profile`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(profileActions.setProfiles(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
