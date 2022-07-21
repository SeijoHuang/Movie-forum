<template>
  <div class="nav">
    <div class="container">
      <div class="nav__container">
        <img @click.stop="jumpToHome" src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg" alt="" class="nav__item logo">
        <div class="nav__item menu">       
          <router-link to= "/">
            <p class="menu__item home" >Home</p>
          </router-link>         
          <div class="menu__item dropdown" ref="dropdown">
            <button @click.stop="toggleMenu" >Genres</button>          
            <menu v-show="menuOpen">
              <li
              v-for = "genre in genres" :key=genre.id value=genre.id
              @click.stop="jumpPage(genre.id)"              
              >      
                {{genre.name}}
              </li>
            </menu>                       
          </div>
        </div> 
        <div class="nav__item search-bar" :class="{open:isSearchBoxOpen}">           
            <input type="checkbox" name="search" id="search">
            <div class="search-box" ref="search">
              <label for="search" @click.stop.prevent="openSearchBox"><span class="icon-search"></span></label>    
              <input type="text" placeholder="Movie" class="search-input" ref="input">
            </div>
            <button v-show="!isSearchBoxOpen" @click.stop="openSearchBox"><span class="icon-search"></span></button>
        </div>       
      </div>     
    </div>
  </div>
</template>
<script>
import moviesApi from "../apis/movies"
import { visitPage } from "../utils/mixins"
export default {
  name: "NavTab",
  mixins:[visitPage],
  data(){
    return {
      genres:[],
      menuOpen: false,
      isSearchBoxOpen: false
    }
  },
  methods: {
    async getGenres () {
      try{
        const {data} = await moviesApi.getGenres()
        this.genres = data.genres
      } catch (error) {
        this.$toast('error', error.response.data.status_message)
      }
    },
    jumpPage( id ) {
      this.toggleMenu()
      this.$router.push({
        name: "genre",
        params: {
          genreId: id
        }
      })
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },
    close(e) {
      //點擊其他地方將menu和search box關閉 
      this.menuOpen = false
      
      if (this.isSearchBoxOpen) {
        if (!this.$refs.search.contains(e.target)) {
          this.isSearchBoxOpen = false
        }
      }        
    },
    openSearchBox() {
      this.isSearchBoxOpen = !this.isSearchBoxOpen   
      this.$refs.input.focus()  
    }
  },
  created() {
    this.getGenres()
    //點擊關閉視窗監聽器
    window.addEventListener('click', this.close)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.close)
  },
}
</script>
<style lang="scss" scoped>
  .container {
    height: 100%;
    padding: 0;
    margin: 0;
  }
  .nav{
    position:fixed;
    top: 0; 
    padding: 0 4%;
    width: 100%;
    height: 41px;
    background-image: linear-gradient(180deg,rgba(0,0,0,.7) 10%,transparent);
    z-index: 99;
    @media screen and (min-width: 721px) {
      height: 55px;
    }
    &__container {
      display: flex;
      align-items: center;
      height: 100%;
    }
    
    .logo{
      width: 8%;
      min-width: 80px;
      height: 100%;
    }
  }
  .home {
    display: none;
  } 
  .menu {
    display: flex;
    flex: 1;
    gap: 2rem;
    &__item {
      cursor: pointer;
    }
    button{
      position: relative;
      padding: 0 2rem 0 0;
      font-size: 1rem;
      &::after {
        content: "";
        position: absolute;
        border-style: solid;
        border-width: 8px 5px 0 5px;
        border-color: $font-white transparent transparent transparent;
        top: 50%;
        right: 20%;
        transform: translateY(-50%);
      }
    }
    menu {
      position: absolute;
    }    
  }
  .search-bar {
    justify-content: flex-end;
    position: absolute;
    right: 4%;
    display: flex;
    height: 30px;
    width: 25%;
    .search-box {
      display: flex;
      align-items: center;
      gap: 8px;  
      transform: scaleX(0);
      width: 100%;
      padding-left: 5px;
    }
    label {
      cursor: pointer;
    }
    #search {
      display: none;         
      &:checked ~ label {
        opacity: 0;
        cursor: default;
      }
    }  
  }
  .open{
    border: 1px solid $font-white;
    >.search-box{
      transform: scaleX(1);
      transform-origin: right;
      transition: transform 0.3s ease-out;
    }
  }
  .icon-search {
    font-size: 1.2rem;
  }

  @media screen and (min-width: 576px) {
    .nav__container{
      gap: 2rem;
    }
    .home {
      display: block;
    }
  }
  
  
</style>