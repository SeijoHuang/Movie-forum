<template>
  <div class="home">
    <MainSlide />
    <template v-if="isOpen">
      <router-view/>
    </template>
    
  </div>
</template>

<script>
import MainSlide from "../components/MainSlide.vue"
import moviesApi from "../apis/movies"
export default {
  name: 'Home',
  components: {
    MainSlide
  },
  data(){
    return {
      isOpen: true,
      billboards: [
        {
          title:"Popular",
        },
        {
          title:"Top Rated"
        },
        {
          title:"Now Playing"
        },
        {
          title:"Up Coming"
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
        this.$toast('error', error.response.data.status_message)
      }
    }
  },
  mounted() {
    this.getBillboards()
  }
}
</script>
 