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
    isModalLoading: false,
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
    searchResult: {
      page: "",
      results: [],
      total_pages: "",
      total_results: "",
    },
    page: {
      currentPage: "",
      totalPages: "",
      pageArr: [],
      showPrevMore: false,
      showNextMore: false
    },
    genreOnShow: {
      genreName:"",
      genreResults:[
        {
          id:"",
          backdrop_path:"",
          poster_path:"",
          release_date:"",
          title:"",
          vote_average:"",
          vote_count:""
        }
      ] 
    }
  },
  getters: {},
  mutations: {
    toggleModal(state) {
      state.isModalOpen = !state.isModalOpen
    },
    changeLoadingState(state) {
      state.isLoading = !state.isLoading
    },
    changeModalState(state){
      state.isModalLoading = !state.isModalLoading
    },
    getMovieModalContent(state, data) {
      state.movieModalContent = data
    },
    setSearchResult(state, data) {
      const { page, results, total_pages, total_results } = data
      const newResults = results.map((result) => {
        const isVoterOver = result.vote_count / 1000 < 1
        return {
          ...result,
          poster_path: result.poster_path
            ? imgPath.poster + result.poster_path
            : require("../assets/static/images/noPoster.png"),
          backdrop_path: result.backdrop_path
            ? imgPath.backdrop + result.backdrop_path
            : require("../assets/static/images/noBackdrop.jpeg"),
          release_date: result.release_date? result.release_date.slice(0, 4) : "?",
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
        total_results,
      }
    },
    setGenreOnShow(state, data) {
      const {results, genreName} = data
      const newResults = results.map( (movie) => {
        const isVoterOver = movie.vote_count / 1000 < 1
        return {
          id: movie.id,
          title: movie.title,
          vote_average: movie.vote_average,
          poster_path: movie.poster_path
            ? imgPath.poster + movie.poster_path
            : require("../assets/static/images/noPoster.png"),
          backdrop_path: movie.backdrop_path
            ? imgPath.backdrop + movie.backdrop_path
            : require("../assets/static/images/noBackdrop.jpeg"),
          release_date: movie.release_date
            ? movie.release_date.slice(0, 4)
            : "?",
          vote_count: isVoterOver
            ? movie.vote_count
            : Math.round((movie.vote_count / 1000) * 100) / 100 + "k ",
        }
      })
      state.genreOnShow = {
        genreName,
        genreResults: newResults
      }
    },
    setPagination(state, { current, total }) {
      const showPager = 6
      const half = Math.ceil( showPager / 2 ) 
      let { showNextMore, showPrevMore } = state.page
      //api頁數最多只能 request到500頁，超過會報錯
      if(total > 500) {
        total = 500
      } 
      state.page = {
        ...state.page,
        currentPage: current,
        totalPages: total,
        showNextMore: false,
        showPrevMore: false,
      }

      //判斷是否要折疊分頁器
      if (current < total - half) {
        showNextMore = true
      }
      if (current > half) {
        showPrevMore = true
      }
      if (total > showPager) {
  
        if (current > half) {
          showPrevMore = true
        }
        if (current < total - half) {
          showNextMore = true
        }
        if (current > total - (half + 1)) {
          showNextMore = false
        }
        if (current < showPager - 1 ) {
          showPrevMore = false
        }
      }
      state.page = {
        ...state.page,
        showNextMore,
        showPrevMore,
      }
      //總頁數小於6的話全部顯示
      if (total <= showPager) {
        const pageArr = []
        for (let i = 2; i < total; i++) {
          pageArr.push(i)
        }
        state.page = {
          ...state.page,
          showNextMore: false,
          showPrevMore: false,
          pageArr,
        }
        return
      }

      //處理顯示的頁碼 放入pageArr中
      if (!showPrevMore && showNextMore) {
        const pageArr = []
        for (let i = 2; i <= showPager; i++) {
          pageArr.push(i)
        }
        state.page = {
          ...state.page,
          pageArr,
        }
      } else if (showPrevMore && !showNextMore) {
        const pageArr = []
        const start = total - (showPager - 2)
        for (let i = start; i < total; i++) {
          pageArr.push(i)
        }
        state.page = {
          ...state.page,
          pageArr,
        }
      } else if (showNextMore && showPrevMore) {
        const pageArr = []
        for (let i = current - 2; i <= current + 2; i++) {
          pageArr.push(i)
        }
        state.page = {
          ...state.page,
          pageArr,
        }
      }
    },
  },
  actions: {
    //MovieModal資料
    async getMovieData({ commit }, movieId) {
      try {
        commit("changeModalState")
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
        //存入點開movieModal的電影資料
        commit("getMovieModalContent", {
          genres,
          id,
          overview,
          poster_path: poster_path
            ? imgPath.poster + poster_path
            : require("../assets/static/images/noPoster.png"),
          release_date: release_date
            ? release_date.slice(0, 4)
            : "no release date",
          runtime,
          spoken_languages: spoken_languages.length
            ? spoken_languages[0].english_name
            : "?",
          title,
          vote_average,
          vote_count: isVoterOver
            ? vote_count
            : Math.round((vote_count / 1000) * 100) / 100 + "k ",
            // 取到小數點後第二位
        })
        commit("changeModalState")
      } catch (error) {
        commit("changeModalState")
        Toast.fire({
          icon: "error",
          title: error.response.data.status_message,
        })
      }
    },
    //取得搜尋電影資料
    async getSearchResult({ commit }, { page, query }) {
      try {
        commit("changeLoadingState")
        const { data } = await movieApi.search({
          page,
          query,
        })
        const { page: current, total_pages:total } = data
        //存入搜尋結果資料
        commit("setSearchResult", data)
        //存入頁數相關資料、處理頁碼
        commit("setPagination", { current, total })
        //更改 loading狀況
        commit("changeLoadingState")
      } catch (error) {
        commit("changeLoadingState")
        Toast.fire({
          icon: "error",
          title: error.response.data.status_message,
        })
      }
    },
    //取得指定電影類別的資料
    async getGenreData ( {commit}, { page, genreId, genreName }) {
      try{
        commit("changeLoadingState")        
        const { data } = await movieApi.getGenreData({ page, genreId })
        const { results, page: current, total_pages: total } = data
        commit("setGenreOnShow", { results, genreName })
        //存入頁數相關資料、處理頁碼
        commit("setPagination", { current, total })
        commit("changeLoadingState")
      }catch(error){
        commit("changeLoadingState")
        Toast.fire({
          icon: "error",
          title: error.response.data.status_message,
        })

      }
    }
  },
  modules: {},
})
