import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

//Login User
export function loginUser(user) {
  return async (dispatch) => {
    try {
      //   const response = await fetch(path, {
      //     method: "POST",
      //     body: JSON.stringify(user),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   const data = await response.json();

      const res = await request.post("/api/auth/login", user);

      dispatch(authActions.login(res.data));
      localStorage.setItem("userInfo", JSON.stringify(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

//logout User
export function logoutUser() {
  return (dispatch) => {
    dispatch(authActions.logout);
    localStorage.removeItem("userInfo");
    window.location.reload();
  };
}

//Register User
export function registerUser(user) {
  return async (dispatch) => {
    try {
      const res = await request.post("/api/auth/register", user);

      dispatch(authActions.register(res.data.message));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

//Verify Email
export function verifyEmail(userId, token) {
  return async (dispatch) => {
    try {
      await request.get(`/api/auth/${userId}/verify/${token}`);
      dispatch(authActions.setIdEmailVerified());
    } catch (error) {
      console.log(error);
    }
  };
}
