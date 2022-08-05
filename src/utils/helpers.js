import axios from "axios"
import { apiKey } from "../../key";
import Swal from "sweetalert2"

const baseURL = "https://api.themoviedb.org/3"

const axiosInstance = axios.create({
  baseURL,
  params: {
    api_key: apiKey
  }
});

export const apiHelper = axiosInstance

//sweet alert setting 
export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer)
    toast.addEventListener("mouseleave", Swal.resumeTimer)
  }
})

//img path
export const imgPath = {
  poster: "http://image.tmdb.org/t/p/w342/",
  backdrop: "http://image.tmdb.org/t/p/w780/",
}
