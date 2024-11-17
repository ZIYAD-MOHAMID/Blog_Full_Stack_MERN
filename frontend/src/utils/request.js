import axios from "axios";
console.log(process.env.REACT_APP_BACKEND_URL);

const request = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});
export default request;
