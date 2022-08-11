<template>
  <div class="home">
    <MainSlide />

    <div class="billboard-container">
      <template v-if="isLoading">
        <Spinner />
      </template>
      <template v-else>
        <template v-for="billboard in billboards" >
          <BillboardSlide
            :key="billboard.id" 
            :movie-data="billboard" 
          >
          </BillboardSlide>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import MainSlide from "../components/MainSlide.vue"
import moviesApi from "../apis/movies"
import BillboardSlide from "../components/BillboardSlide.vue"
import Spinner from "../components/Spinner.vue"
import { mapState } from "vuex"
import { imgPath } from "../utils/helpers"

export default {
  name: 'Home',
  components: {
    MainSlide,
    BillboardSlide,
    Spinner
  },
  data(){
    return {
      billboards: [
        {
          title:"Popular",
          id: 1,
        },
        {
          title:"Top Rated",
          id: 2,
        },
        {
          title:"Now Playing",
          id: 3,
        },
        {
          title:"Up Coming",
          id: 4,
        },
      ]
    }
  },
  methods: {
    async getBillboards(){
      try{
        this.$store.commit("changeLoadingState")
        const {data: popular} = await moviesApi.getPopular()
        const {data: topRated} = await moviesApi.getTopRated()
        const {data: nowPlaying} = await moviesApi.getNowPlaying()
        const {data: upComing} = await moviesApi.getUpComing()
        const newBillboards = this.billboards.map( board => {
          switch (board.title) {
            case "Popular":
              return {
                ...board,
                movies: this.dataFilter(popular.results)
              }
            case "Top Rated":
              return {
                ...board,
                movies: this.dataFilter(topRated.results)
              }
            case "Now Playing":
              return {
                ...board,
                movies: this.dataFilter(nowPlaying.results)
              }
            case "Up Coming":
              return {
                ...board,
                movies: this.dataFilter(upComing.results)
              }
          }
        })
        this.billboards = newBillboards
        this.$store.commit("changeLoadingState")
      } catch(error) {
        this.$toast("error", error.response.data.status_message)
      }
    },
    dataFilter(data){
      const newData = data.map( object => {
        const { backdrop_path, id, title, poster_path, release_date, vote_average, vote_count } = object
        return {
          backdrop_path: backdrop_path
            ? imgPath.poster + backdrop_path
            : require("../assets/static/images/noBackdrop.jpeg"),
          id,
          title,
          poster_path: poster_path
            ? imgPath.poster + poster_path
            : require("../assets/static/images/noPoster.png"),
          release_date: release_date? release_date.slice(0, 4) : "no release date",
          vote_average,
          vote_count: this.voterCal(vote_count)
        }
      })
      return newData
    },
    //電影評分人數換算
    voterCal(num) {
      if(num / 1000 < 1) return num
      // 四捨五入至小數點第二位
      return Math.round( (num / 1000) * 100)/100 + 'k '
    }
  },
  computed: {
      ...mapState( ["isLoading"] )
  },
  created() {
    this.getBillboards()
  }
}
</script>
 
 <style lang="scss" scoped>
  .billboard-container {
    margin-top: -1rem;
    @media screen and (min-width: 721px){
      margin-top: -2rem;
    }
    @media screen and (min-width: 1280px){
      margin-top: -4rem;
    }
  }
 </style>