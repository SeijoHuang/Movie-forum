<template>
  <div class="movie-modal__container">
    <Modal>
      <div class="content">
        <div class="content__item-poster-container">
          <img :src="'http://image.tmdb.org/t/p/w780/'+ movieModalContent.poster_path" alt="" class="poster">
        </div>       
        <div class="content__item-intro">
          <p class="title">{{ movieModalContent.title }}</p>
          <div class="subtitle">
            <p class="release">{{ movieModalContent.release_date }}</p>
            <div class="genres__list">
              <p class="genres__list__item" 
                v-for="genre in movieModalContent.genres"
                :key="genre.id"
              >
                {{genre.name}}
              </p>
            </div>
          </div>
          <p class="overview">{{ movieModalContent.overview }}</p>
          <div class="detail__container">
            <div class="detail__item runtime">
              <p class="detail__item-title">Runtime</p>
              <p class="detail__item-content">{{ movieModalContent.runtime + 'mins' }}</p>
            </div>
            <div class="detail__item  language">
              <p class="detail__item-title">Language</p>
              <p class="detail__item-content">{{ movieModalContent.spoken_languages }}</p>
            </div>
            <div class="detail__item rating">
              <p class="detail__item-title">User Score</p>
              <Rating>
                <template #rating>
                  {{movieModalContent.vote_average }}
                </template>
                <template #voteCount>
                  {{ movieModalContent.vote_count }}
                </template>           
              </Rating>
            </div>
          </div>
        </div>
      </div>  
    </Modal>
  </div> 
</template>
<script>
import Modal from "../components/Modal.vue"
import Rating from "../components/Rating.vue"
import { mapState } from "vuex"
export default {
  name: "MovieModal",
  components: {
    Modal,
    Rating
  },
  computed: {
    ...mapState( ["movieModalContent", "isLoading"] )
  }
}
</script>
<style lang="scss" scoped>
  .content {
    @media screen and (min-width:576px){
      display: flex;
    }
  }
  .content__item-poster-container {
    position: relative;
    &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 20%;
        background-image: linear-gradient(to top, $gray 0%,transparent 100%); 
      }   
    @media screen and (min-width:576px){
      flex: 0 0 40%;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        right: -2%;
        width: 102%;
        height: 100%;
        background-image: linear-gradient(to left, $gray 2%,transparent 100%); 
      }
    }  
    .poster {   
      width: 100%;
      height:100%;
      object-fit: cover;
      border-radius: 8px 0 0 8px;  
       
    }    
  }
  .content__item-intro {
    padding: 2.4rem 1rem 2rem 1rem;
    word-wrap: break-all;
    .subtitle {
      display: flex;
      margin-top: 5px;
      align-items: center;
    }
    .release, .genres__list__item {
      color:$font-gray;
    }
    .title {
      font-size: 2rem;
    }
    .release {
      line-height: 1.2rem;
      @extend %release-date-border;
    }
    .genres__list {
      margin-left: 1rem;
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      word-wrap: break-all;
      &__item {
        text-align: center;
        font-weight: 300;
        &::after {
          content:"·";
          text-align: center;
        }
      }
      &__item:last-child {
        &::after {
          content:"";
        }
      }
    }
    .overview {
      margin-top: 2rem;
      font-size: 1.2rem;
    }
    .detail__container {
      margin-top: 2rem;
      display: grid;
      grid-template-columns: 2;
      gap: 1.5rem 0;

      .runtime {
        grid-column: 1/2;
      }
      .language {
        grid-column: 2/3;
      }
      .rating {
        grid-column: 1/3;
      }
      .detail__item {
        &-title {
          font-size: 1.2rem;
          color:$font-gray;
          margin-bottom: 5px;
        }
      }
    }
  }
</style>