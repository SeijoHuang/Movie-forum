import Vue from 'vue'
import Vuex from 'vuex'
import movieApi from "../apis/movies"
import { Toast } from "../utils/helpers"
import { imgPath } from "../utils/helpers"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isModalOpen: false,
    isLoading: false,
    movieModalContent: {
      id: "",
      poster_path: "",
      title: "",
      overview: "",
      genres: [],
      release_date: "",
      runtime: "",
      spoken_languages: "",
      vote_average: "",
      vote_count: "",
    },
    searchResult:{
      page:"",
      results:[],
      total_pages: "",
      total_results:""
    }
  },
  getters: {},
  mutations: {
    toggleModal(state) {
      state.isModalOpen = !state.isModalOpen
    },
    changeLoadingState(state) {
      state.isLoading = !state.isLoading
      console.log("isLoading", state.isLoading)
    },
    getMovieModalContent(state, data) {
      state.movieModalContent = data
    },
    setSearchResult(state, data) {
      const {page, results, total_pages, total_results} = data  
      const newResults = results.map( result => {
        const isVoterOver = result.vote_count / 1000 < 1
        return {
          ...result,
          poster_path: result.poster_path
            ? imgPath.poster + result.poster_path
            : require("../assets/static/images/noPoster.png"),
          backdrop_path: result.backdrop_path
            ? imgPath.backdrop + result.backdrop_path
            : require("../assets/static/images/noBackdrop.jpeg"),
          release_date: result.release_date.slice(0, 4),
          vote_count: isVoterOver
            ? result.vote_count
            : Math.round((result.vote_count / 1000) * 100) / 100 + "k ",
        }
      })
      state.searchResult = {
        ...state.searchResult,
        page,
        results: newResults,
        total_pages,
        total_results
      }
    }
  },
  actions: {
    //MovieModal資料
    async getMovieData({ commit }, movieId) {
      try {
        commit("changeLoadingState")
        const { data } = await movieApi.getDetail(movieId)
        const {
          genres,
          id,
          overview,
          poster_path,
          release_date,
          runtime,
          spoken_languages,
          title,
          vote_average,
          vote_count,
        } = data

        //判斷評分人數是否大於1000人
        const isVoterOver = vote_count / 1000 < 1

        commit("getMovieModalContent", {
          genres,
          id,
          overview,
          poster_path: poster_path
            ? imgPath.poster + poster_path
            : require("../assets/static/images/noPoster.png"),
          release_date: release_date.slice(0, 4),
          runtime,
          spoken_languages: spoken_languages.length? spoken_languages[0].english_name : "no information",
          title,
          vote_average,
          vote_count: isVoterOver
            ? vote_count
            : Math.round((vote_count / 1000) * 100) / 100 + "k ",
        })
        commit("changeLoadingState")
      } catch (error) {
        console.error.response
         Toast.fire({
           icon: "error",
           title: error.response.data.status_message,
         })
      }
    },
    //取得搜尋電影資料
    async getSearchResult({commit}, {page, query}) {
      try{
        commit("changeLoadingState")
        const { data } = await movieApi.search( {
          page,
          query
        })
        commit("setSearchResult", data)
        commit("changeLoadingState")
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: error.response.data.status_message,
        })
      }
    }
  },
  modules: {},
})
