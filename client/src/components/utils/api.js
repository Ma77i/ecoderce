import axios from "axios";

export default axios.create({
//   baseURL: "https://ecoderce.herokuapp.com"
  baseURL: process.env.NODE_ENV === "production"
  ? "https://ecoderce.herokuapp.com"
  : "http://localhost:8080"
});