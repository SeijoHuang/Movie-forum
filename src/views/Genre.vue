<template>
  <div class="page-container">
    <h2 class="page-title title-box"> {{genreOnShow.genreName}} </h2>
    <PageLayout>
      <template #movie-card>
        <div class="col"
          v-for="movie in genreOnShow.genreResults"
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
export default {
  name: "Genre",
  components: {
    PageLayout,
    MovieCard,
    Rating
  },
  computed: {
    ...mapState(["isLoading", "genreOnShow"])
  },
  methods: {
    toggleModal(id){
      this.$store.commit("toggleModal")
      store.dispatch("getMovieData", id)
    }
  },
  created(){
    const {page, id, name} = this.$route.query
    store.dispatch("getGenreData", {page, genreId:id, genreName: name})
  },
  beforeRouteUpdate(to, from, next){
    const {page, id, name } = to.query
    store.dispatch("getGenreData", {page, genreId:id, genreName: name})
    next()
  }
}
</script>
<style lang="scss" scoped>
  ::v-deep .container{
    margin-top: 2rem;
    @media screen and (min-width: 577px){
       margin-top: 4rem;
    }
  }
  .page-title {
    position: fixed;
    width: 100%;
    top: 40px;
    padding: 1.2rem 0 1.2rem 4%;
    z-index: 2;
    background: $gray;
    font-size: 1.2rem;
    @media screen and (min-width: 577px) {
      top: 45px;
      font-size: 1.8rem;     
    }
  }
</style>