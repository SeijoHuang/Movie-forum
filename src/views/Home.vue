<template>
  <div class="home">
    <MainSlide />
      <!-- <router-view/> -->
    <div class="billboard-container">
      <template v-for="billboard in billboards" >
        <BillboardSlide
          :key="billboard.id" 
          :movie-data="billboard"
          @afterClickToggleModal="toggleModal"
        >
        </BillboardSlide>
      </template>
    </div>
    
  </div>
</template>

<script>
import MainSlide from "../components/MainSlide.vue"
import moviesApi from "../apis/movies"
import BillboardSlide from "../components/BillboardSlide.vue"
import { mapState } from "vuex"
export default {
  name: 'Home',
  components: {
    MainSlide,
    BillboardSlide
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
      } catch(error) {
        this.$toast("error", error.response.data.status_message)
      }
    },
    dataFilter(data){
      const newData = data.map( object => {
        const { backdrop_path, id, title, poster_path, release_date, vote_average, vote_count } = object
        return {
          backdrop_path,
          id,
          title,
          poster_path,
          release_date,
          vote_average,
          vote_count
        }
      })
      return newData
    },
    toggleModal(){
      console.log("parent got emit")
      this.$store.commit("toggleModal")
    }
  },
  computed: {
      ...mapState( ['isModalOpen'] )
  },
  mounted(){
    console.log("mounted ok")
  },
  created() {
    this.getBillboards()
  }
}
</script>
 
 <style lang="scss" scoped>
  .billboard-container {
    margin-top: -4rem;
  }
 </style>