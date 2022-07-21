import { apiHelper } from "../utils/helpers";

export default {
  getLatest(){
    return apiHelper.get("/movie/latest")
  },
  getGenres(){
    return apiHelper.get("/genre/movie/list")
  },
  getTrending(){
    return apiHelper.get("trending/movie/day")
  }
}