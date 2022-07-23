<template>
  <div class="home">
    <MainSlide />
    <template v-if="isOpen">
      <router-view/>
    </template>
    <div class="billboard-container">
      <template v-for="billboard in billboards" >
        <BillboardSlide :key="billboard.id" :movie-data="billboard"></BillboardSlide>
      </template>
    </div>
    
  </div>
</template>

<script>
import MainSlide from "../components/MainSlide.vue"
import moviesApi from "../apis/movies"
import BillboardSlide from "../components/BillboardSlide.vue"
export default {
  name: 'Home',
  components: {
    MainSlide,
    BillboardSlide
  },
  data(){
    return {
      isOpen: true,
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
                movies: [...popular.results]
              }
            case "Top Rated":
              return {
                ...board,
                movies: [...topRated.results]
              }
            case "Now Playing":
              return {
                ...board,
                movies: [...nowPlaying.results]
              }
            case "Up Coming":
              return {
                ...board,
                movies: [...upComing.results]
              }
          }
        })
        this.billboards = [...newBillboards]
      } catch(error) {
        this.$toast("error", error.response.data.status_message)
      }
    }
  },
  mounted() {
    this.getBillboards()
  }
}
</script>
 
 <style lang="scss" scoped>
  .billboard-container {
    margin-top: -3rem;
  }
 </style>