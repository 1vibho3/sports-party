import axios from "axios";
import url from "../url";

const instance = axios.create({
  baseURL: url,
});

export default instance;
