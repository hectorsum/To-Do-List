import axios from "axios"
import { JSON_API } from "../helpers/Constant";

const axiosClient = axios.create({
  baseURL:JSON_API
})

export default axiosClient;