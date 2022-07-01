import axios from "axios"
import { apiKey } from "../../key";

const baseURL = "https://api.themoviedb.org/3"

const axiosInstance = axios.create({
  baseURL,
  params: {
    api_key: apiKey
  }
});

export const apiHelper = axiosInstance