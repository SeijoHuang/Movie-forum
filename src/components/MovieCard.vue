<template>
  <div class="movie-card__container">
    <div class="movie-card">
      <!-- poster -->
      <div class="movie-card__show">
        <slot name="poster">
        </slot>
      </div>   
      <!-- show when hover  -->
      <div class="movie-card___hidden">
        <div class="movie-card____hidden-item  backdrop">
          <slot name="backdrop">
          </slot>
        </div> 
        <div class="movie-card____hidden-item intro">
          <div class="intro__title">
            <slot name="title">
            </slot>
          </div>
          <div class="intro__release">
            <slot name="release">
            </slot>
          </div>
          <div class="intro-bottom">
            <div class="intro__score">
              <slot name="score">
              </slot>
            </div>
            <div class="intro__button">
              <slot name="modalBtn" >
                <button class="modalBtn" @click.stop="openMovieModal"> 
                  <span class="icon-arrow_lift"></span>
                </button>
              </slot>
            </div> 
          </div>                  
        </div>               
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MovieCard",
  methods:{
    openMovieModal(){
      console.log("children emit")
      this.$emit('afterClickToggleModal')
      
    }
  }
}
</script>
<style lang="scss" scoped>
  .movie-card {
    width: 100%;
    height: 100%;
    position:relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .backdrop{
      height: 50%;   
    }
    &__show {
      width:100%;
      height: 100%;
      object-fit: cover;;
    }
    &___hidden {
      transform: scale(0);
      flex-flow: column;
      position: absolute;
      top: -6%;
      left: -25%;
      width: 160%;
      height: 106%;
      border-radius: 5px;
      background-color: $pop-up-card;
      box-shadow: 0 0 10px black;
      img {
        border-radius: 5px 5px 0 0;
      }   
    }
    &:hover > &__show {
      opacity: 0;
      transition-delay: .6s;
    }
    &:hover > &___hidden {
      transform: scale(1);     
      transform-origin: (50% 50%);
      transition: transform .4s ease-in .6s;
    }
  }

  .intro {
    height: 50%;
    font-size: 10px;
    grid-template-columns: 1fr 1fr;
    padding: 5% 6%;
    .intro-bottom {
      display: flex;
      font-size: 1.8em;
      margin-top: 4%;
      width: 100%;
      align-items: center;
      justify-content: space-between;
    }
    &__title {
      font-size: 2.2em;
    }
    &__release {
      margin-top: .5em;
      font-size: 1.5em;
      border: 1px solid $font-gray;
      border-radius: 3px;
      width: 3em;
      text-align: center;
    }
    &__button {
      .icon-arrow_lift {
        color: $font-gray;
        &::before {
          display: block;
        }
      }
      .modalBtn {
        transform: rotate(270deg);
        background: $pop-up-card;
        border: 2px solid ;
        border-color: $font-gray;
        width: 3em;
        height: 3em;
        border-radius: 50%;
        &:hover {
          @extend %hover-reaction;
        }
        &:hover > .icon-arrow_lift {
          @extend %hover-reaction;
        }
      }
    }
  }
 
</style>