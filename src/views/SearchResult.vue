<template>
  <div class="page-container">
    <h2 class="page-title total-box">About {{searchResult.total_results}} results </h2>
    <PageLayout>
      <template #movie-card>
        <div class="col"
          v-for="movie in searchResult.results"
          :key="movie.id"
        >
          <MovieCard>            
            <template #poster>
              <img class="movie-card__show modal-active" @click.stop="toggleModal(movie.id)" 
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
              <button class="modal-btn modal-active" @click.stop="toggleModal(movie.id)"> 
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
      </template>
    </PageLayout>
  </div>
</template>
<script>
import PageLayout from "../components/PageLayout.vue"
import MovieCard from "../components/MovieCard.vue"
import Rating from "../components/Rating.vue"
import { mapState } from "vuex"
import store from "../store"
import { modalController } from "../utils/mixins"

export default {
  name:"SearchResult",
  components: {
    PageLayout,
    MovieCard,
    Rating,
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
  .page-title {
    color: $font-gray;
    font-size: 1.2rem;
    margin-top: 1rem;
    padding-left: 4%;
  }
</style>