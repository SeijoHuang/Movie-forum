<template>
  <div class="swiper-billboard-container">
    <div class="title">Title</div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide>Slide 6</swiper-slide>
      <swiper-slide>Slide 7</swiper-slide>
      <swiper-slide>Slide 8</swiper-slide>
      <swiper-slide>Slide 9</swiper-slide>
      <swiper-slide>Slide 10</swiper-slide>
      <swiper-slide>Slide 11</swiper-slide>
      <swiper-slide>Slide 12</swiper-slide>
      <swiper-slide>Slide 13</swiper-slide>
      <swiper-slide>Slide 14</swiper-slide>
      <div class="swiper-pagination btn-hidden" slot="pagination"></div>
      <div class="swiper-button-prev btn-hidden" slot="button-prev"></div>
      <div class="swiper-button-next btn-hidden" slot="button-next"></div>      
    </swiper>
  </div>
 
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'

  export default {
    name: 'swiper-example-responsive-breakpoints',
    title: 'Responsive breakpoints',
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        swiperOption: {
          slidePerView: 1,
          spaceBetween: 10,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: {
            el: '.swiper-pagination',
          },
          loop: true,
          breakpoints: {
            1280: {
              slidesPerView: 6,
              slidesPerGroup: 6,
        
            },
            721: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            577: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            350: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            }
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .title {
    position: absolute;
    z-index: 2;
    padding-left: 4%;
  }
  .btn-hidden {
    transform: scale(0);
  }
  .swiper {
    position:relative;
    height: 25vh;
    margin-bottom: 3rem;
    padding: 0 4%;
    @media screen and (min-width: 721px){
      height: 25vh;
    }
    @media screen and (min-width: 1280px){
      height: 35vh;
    }
    &:hover > .btn-hidden {
      transform: scale(1);
      transition: transform .1s ease-in;
      transform-origin: bottom right; 
    }
   
  }
  .swiper-slide {
    background: white;
    color: green;
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
  .swiper-pagination {
    position: unset;    
    text-align: end;
    margin-bottom: .5rem;
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
  
</style>