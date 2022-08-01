<template>
  <div class="swiper__container">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide class="slide__container" v-for = "movie in movies" :key = "movie.id">
        <img class="slide__item backdrop" :src="'http://image.tmdb.org/t/p/w1280/' + movie.backdrop_path" alt="">
        <div class="slide__item info">
          <div class="title"> {{movie.title}} </div>
          <button class="more-btn" @click.stop="jump('MovieModal',movie.id )">
            <span class="icon-info_outline"></span>
            more
          </button>
        </div>
        <div class="vignette-layer main-vignette-layer"></div> 
        <div class="vignette-layer bottom-vignette-layer"></div>      
      </swiper-slide>   
      <div class="swiper-pagination" slot="pagination"></div> 
    </swiper>
  </div>

</template>
<script>
  import { Swiper, SwiperSlide } from "vue-awesome-swiper"
  import "swiper/css/swiper.css"
  import moviesApi from "../apis/movies"
  import { visitPage } from "../utils/mixins"
  export default {
    name: "MainSlide",
    components: {
      Swiper,
      SwiperSlide
    },
    mixins:[ visitPage ],
    data() {
      return {
        swiperOption: {
          spaceBetween: 0,          
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
            hideOnclick: true,
          },
          // autoplay: {
          //   delay: 2500,
          //   disableOnInteraction: true
          // },
          loop: true
        },
        movies:[],
      }
    },
    methods: {
      async getTrending(){
        try{
          const {data} = await moviesApi.getTrending()
          //陣列洗牌,取10個
          this.movies = this.shuffle(data.results).splice(0,10)
        } catch(error){
          this.$toast('error', error.response.data.status_message)
        }        
      },
      shuffle(movies){
        const n = movies.length
        for (let i = 0; i < n; i ++) {
          const randomNum = Math.floor(Math.random() * (n - i)) + i;
          [movies[i], movies[randomNum]] = [ movies[randomNum], movies[i]]
        }
        return movies
      },
      openMovieModal(id){
        this.jump('MovieIntro',id)
      }
    },
    created() {
      this.getTrending()
    }
  }
</script>
<style lang="scss" scoped>
 .swiper {
  height: 45vh;
  width: 100%;
  border: 1px transparent solid;
  @media screen and (min-width: 721px){
    height: 60vh;
  }
  @media screen and (min-width: 1280px){
    height: 95vh;
  }
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
    font-size: 14px;
    background-color: transparent;   
  }
  .slide__container {
    position: relative;
  }
  // pagination圓點hover效果
  .swiper-pagination {
    transform: scale(0)
    
  }
  &:hover > .swiper-pagination{
    transform: scale(1)
  }
  ::v-deep .swiper-pagination-bullet {
    @extend %swiper-bullet;
  }
  ::v-deep .swiper-pagination-bullet-active {
    @extend %swiper-bullet-active;
  } 
  .backdrop {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .icon-info_outline {
    font-size: 2vw;
    margin-right: 0.5rem;
  }
  .info {
    width: 25vw;
    position: absolute;
    left: 4%;
    bottom: 30%;  
    z-index: 3;
    .title {
      text-align: left;
      font-size: 2vw;
    }
    .more-btn {
      @extend %button;
      width: 12vw;
      min-width: 64px;
      max-width: 120px;
    }     
  }
  .swiper-pagination {
    position: absolute;
    bottom: 12%;
  }
}
.vignette-layer{
  position:  absolute;
  z-index: 2;
  pointer-events: none;
}
.main-vignette-layer {
  background: linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%);
  bottom: 0;
  top: 0;
  left: 0;
  right: 26.9%;
  opacity: 1;
}
.bottom-vignette-layer {
  background-color: transparent;
  background-image: linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#141414 68%,#141414);
  background-position: 0 top;
  background-repeat: repeat-x;
  background-size: 100% 100%;
  bottom: -1px;
  height: 14.7vw;
  opacity: 1;
  top: auto;
  width: 100%;
}

</style>
