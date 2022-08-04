import Vue from 'vue'
import Vuex from 'vuex'
import movieApi from "../apis/movies"
import { Toast } from "../utils/helpers"
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
    searchResult:{}
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
      state.searchResult = data
    }
  },
  actions: {
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
        let isVoterOver = vote_count / 1000 < 1

        commit("getMovieModalContent", {
          genres,
          id,
          overview,
          poster_path,
          release_date: release_date.slice(0, 4),
          runtime,
          spoken_languages: spoken_languages[0].english_name,
          title,
          vote_average,
          vote_count: isVoterOver
            ? vote_count
            : Math.round((vote_count / 1000) * 100) / 100 + "k ",
        })
        commit("changeLoadingState")
      } catch (error) {
         Toast.fire({
           icon: "error",
           title: error.response.data.status_message,
         })
      }
    },
    async getSearchResult({commit}, {page, query}) {
      try{
        const { data } = await movieApi.search( {
          page,
          query
        })
        console.log( data )
        commit("setSearchResult", data)
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
