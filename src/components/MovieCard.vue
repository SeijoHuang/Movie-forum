<template>
  <div class="movie-card__container">  
    <div class="movie-card">
      <!-- poster -->
      <div class="movie-card__show">
        <div class="img-container">
          <slot name="poster">
          </slot>
        </div>       
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
}
</script>
<style lang="scss" scoped>
  .movie-card__container {
    width: 100%;
    height: 100%
  }
  .movie-card {
    width: 100%;
    height: 100%;
    position:relative;
    .img-container {
      width: 100%;
      height: 100%;
    }
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
      cursor: pointer;
      object-fit: cover;
    }
    .movie-card__show-title {
      text-align: center;    
    }
    &___hidden {
      transform: scale(0);
      flex-flow: column;
      position: absolute;
      top: -3%;
      left: -26%;
      z-index: 1;
      width: 150%;
      height: 106%;
      border-radius: 5px;
      background-color: $pop-up-card;
      box-shadow: 0 0 10px black;
      img {
        border-radius: 5px 5px 0 0;
      }   
    }
    @media screen and (min-width: 993px) {
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
  }

  .intro {
    display: flex;
    flex-flow: column;
    justify-content: space-around;
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
      font-size: 1rem;
    }
    &__release {
      margin-top: .5em;
      font-size: .8rem;
      border: 1px solid $font-gray;
      border-radius: 3px;
      width: 2.5rem;
      text-align: center;
    }
    //icon style
    &__button {
      .icon-arrow_lift {
        @extend %icon;
      }
      .modal-btn {
        @extend %modal-btn;
      }
    }
  }
 
</style>