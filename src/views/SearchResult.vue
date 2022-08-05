<template>
  <div class="search-container">
    <p class="total"> About {{searchResult.total_results}} results </p>
    <div class="container">
      <div class="row row-cols-3 row-cols-sm-4 row-cols-lg-5 gx-4 gy-5">
        <div class="col"
          v-for="movie in searchResult.results"
          :key="movie.id"
        >
          <MovieCard>            
            <template #poster>
              <img class="movie-card__show" @click.stop="toggleModal(movie.id)" 
              :src="movie.poster_path" alt="movie-poster"
            >

              <div class="movie-card__show-title ellipsis">
                {{movie.title}}  
              </div>   
            </template>
                
            <template #backdrop>
              <img class="movie-card__item" :src="movie.backdrop_path" alt="">
            </template>

            <template #title>
              <p class="title ellipsis">
                {{ movie.title }}
              </p>
            </template>

            <template #release>
              <p class="release">
                {{movie.release_date}}
              </p>
            </template>

            <template #modalBtn>
              <button class="modalBtn" @click.stop="toggleModal(movie.id)"> 
                <span class="icon-arrow_lift"></span>
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
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import MovieCard from "../components/MovieCard.vue"
import Rating from "../components/Rating.vue"
import { mapState } from "vuex"
import store from "../store"
import { modalController } from "../utils/mixins"
//TODO:新增搜尋結果無項目時的顯示畫面

export default {
  name: "SearchResult",
  components: {
    MovieCard,
    Rating
  },
  mixins:[ modalController ],
  computed: {
    ...mapState(["searchResult", "isModalOpen"])
  },
  created() {
    const query = this.$route.query
    store.dispatch("getSearchResult", query)
  },
  beforeRouteUpdate(to, from, next){
    const query = to.query
    store.dispatch("getSearchResult", query)
    next()
  }

}
</script>
<style lang="scss" scoped>
//TODO:RWD hover hidden card調整
  .search-container {
    padding-top: 4rem; 
  }
  .container {
    margin: 0;
    padding: 2rem 4%;
    @media screen and (min-width: 576px){
      max-width: unset;
    }
    @media screen and (min-width: 768px){
      max-width: unset;
    }
    @media screen and (min-width: 992px){
      max-width: unset;
    }
  }
  .total {
    color: $font-gray;
    margin-left: 4%;
  }
  .col {
    margin-bottom: 1rem;
  }
  .movie-card__show-title {
    font-size: 1.2rem;
  }
  //icon style
  .icon-arrow_lift {
    @extend %icon;
  }
  .modalBtn {
    @extend %modal-btn;
  }
</style>