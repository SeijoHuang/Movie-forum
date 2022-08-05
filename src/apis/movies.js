import { apiHelper } from "../utils/helpers";

export default {
  getLatest() {
    return apiHelper.get("/movie/latest")
  },
  getGenres() {
    return apiHelper.get("/genre/movie/list")
  },
  getTrending() {
    return apiHelper.get("/trending/movie/day")
  },
  getPopular() {
    return apiHelper.get("/movie/popular")
  },
  getTopRated() {
    return apiHelper.get("/movie/top_rated")
  },
  getNowPlaying(){
    return apiHelper.get("/movie/now_playing")
  },
  getUpComing(){
    return apiHelper.get("/movie/upcoming")
  },
  getDetail(id){
    return apiHelper.get(`/movie/${id}`)
  },
  search({page, query}) {
    const searchParams = new URLSearchParams({ page, query})
    console.log('api', searchParams)
    return apiHelper.get(`/search/movie?${searchParams.toString()}`)
  }
}