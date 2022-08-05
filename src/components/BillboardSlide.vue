<template>
  <div class="swiper-billboard-container">  
    <div class="category"  >{{movieData.title}}</div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide  v-for="movie in movieData.movies" :key="movie.id">
        <MovieCard>            
          <template #poster>
            <img class="movie-card__show toggleModal" :data-id="movie.id" :src="'http://image.tmdb.org/t/p/w342/' + movie.poster_path" alt="">
          </template>       
          <template #backdrop>
            <img class="movie-card__item" :src="'http://image.tmdb.org/t/p/w780/' + movie.backdrop_path" alt="">
          </template>

          <template #title>
            <p class="title ellipsis">
              {{ movie.title }}
            </p>
          </template>

          <template #release>
            <p class="release">
              {{ getYear(movie.release_date) }}
            </p>
          </template>

          <template #modalBtn>
            <button class="modalBtn toggleModal" :data-id="movie.id"> 
              <span class="icon-arrow_lift toggleModal" :data-id="movie.id"></span>
            </button>
          </template>

          <template #score>
            <Rating>
              <template #rating>
                {{ movie.vote_average }}
              </template>
              <template #voteCount>
                {{ movie.vote_count }}
              </template>           
            </Rating>
          </template> 
        </MovieCard>
      </swiper-slide>
      <div class="swiper-pagination btn-hidden" slot="pagination"></div>
      <div class="swiper-button-prev btn-hidden" slot="button-prev"></div>
      <div class="swiper-button-next btn-hidden" slot="button-next"></div>      
    </swiper>
  </div>
 
</template>

<script>
  import { Swiper, SwiperSlide } from "vue-awesome-swiper"
  import 'swiper/css/swiper.css'
  import MovieCard from "../components/MovieCard.vue"
  import Rating from "../components/Rating.vue"
  import { mapState} from "vuex"
  import { modalController } from "../utils/mixins"

  export default {
    name: "BillboardSlide",
    props: {
      movieData: {
        type: Object,
        required: true
      }
    },
    mixins:[ modalController ],
    components: {
      Swiper,
      SwiperSlide,
      MovieCard,
      Rating
    },
    data() {
      return {
        swiperOption: {
          slidePerView: 1,
          spaceBetween: 10,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          pagination: {
            el: ".swiper-pagination",
          },
          loop: true,
          //設定為true，將顯示區內的元素加上指定的class，調整顯示hidden的資料時，最兩側movie card hidden的位置
          watchSlidesProgress : true,
          watchSlidesVisibility : true,
          breakpoints: {
            1280: {
              slidesPerView: 6,
              slidesPerGroup: 6,       
            },
            993: {
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
            577: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            350: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            }
          },
          // 設定swiper on click事件，解決loop模式複製的slide無法觸發click事件的問題
          on: {    
            click: ( {target} )  => {
              if ( !target.matches('.toggleModal')) return
              const movieId = target.dataset.id
              this.toggleModal(movieId)            
            }     
          }
        }
      }  
    },
    methods: {
      getYear(date){
        return date.slice(0,4)
      }
    },
    computed: {
      ...mapState( ["isModalOpen", "isLoading"])
    }
  }
</script>
<style lang="scss" scoped>
  .category {
    position: absolute;
    z-index: 1;
    padding-left: 4%;
  }
  .btn-hidden {
    transform: scale(0);
  }
  .swiper {
    position:relative;
    margin-bottom: 3rem;
    padding: 0 4%;
    &:hover > .btn-hidden {
      transform: scale(1);
      transition: transform .1s ease-in;
      transform-origin: bottom right; 
    }  
  }
  .swiper-container {
    display: flex;
    flex-flow: column;
    flex-direction: column-reverse;
    &::before {
      @extend %slide-btn-cover;
      left: 0;   
    }
    &::after {
       @extend %slide-btn-cover;
       right: 0;
    }
  }

  .swiper-wrapper {
    z-index: 2;
   }

  .swiper-slide:hover {
    z-index: 3;
  }

 //每一頁的第一個movie-card hidden向右移動
  .swiper-slide-active {
    ::v-deep .movie-card___hidden {
      left:0%; 
    } 
  }
  // per view 3 ，每一頁的最後一個movie-card hidden向左移動，避免被next btn遮住
  .swiper-slide-next + .swiper-slide  {
    @media screen and (min-width: 350px) {
      ::v-deep .movie-card___hidden {
        left:-60%; 
      } 
    }
    @media screen and (min-width: 577px) {
      ::v-deep .movie-card___hidden {
        left:-25%; 
      } 
    }   
  }
  
 //per view 4
  .swiper-slide-next + .swiper-slide + .swiper-slide {
    @media screen and (min-width: 577px) {
      ::v-deep .movie-card___hidden {
        left: unset;
        right: 0;
      }
    }
    @media screen and (min-width: 993px) {
      ::v-deep .movie-card___hidden {
        left: -25%;
      }
    }
  }
  // per view 5
  .swiper-slide-next + .swiper-slide + .swiper-slide + .swiper-slide {
     @media screen and (min-width: 993px) {
      ::v-deep .movie-card___hidden {
        left: -60%;
      }
    }
    @media screen and (min-width: 1280px) {
      ::v-deep .movie-card___hidden {
        left: -25%;
      }
    }
  }
// per view 6
  .swiper-slide-next + .swiper-slide + .swiper-slide + .swiper-slide + .swiper-slide {
     @media screen and (min-width: 1280px) {
      ::v-deep .movie-card___hidden {
        left: -60%;
      }
    }
  }

  // pagination樣式
  .swiper-pagination {
    position: unset;    
    text-align: end;
    margin-bottom: .5rem;
    z-index: 0;
  }
  ::v-deep .swiper-pagination-bullet {
    @extend %swiper-bullet;
    border-radius: 0;
    margin: 0 1px;
    width: 13px;
    height: 3px;
  }
  ::v-deep .swiper-pagination-bullet-active {
    @extend %swiper-bullet-active;
  } 
  ::v-deep .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0 1px;
  }
  
  // next / pre btn樣式
  .swiper-button-prev::after, .swiper-button-next::after{
    display: none;
    transform: translateY(50%);
    font-size: 2.5vw;
    color: $font-white;    
    @media screen and (min-width: 577px){
      display: block;
    }
  }
  .swiper-button-prev:hover::after, .swiper-button-next:hover::after {
    font-weight: bolder;
  }

  //icon style
  .icon-arrow_lift {
    @extend %icon;
  }
  .modalBtn {
    @extend %modal-btn;
  }

</style>