<template>
  <div class="nav" ref="nav" :class="{navOnTop: navOnTop}">
    <div class="container">
      <div class="nav__container">
        <img @click.stop="jumpToHome" src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg" alt="" class="nav__item logo">
        <div class="nav__item menu">       
          <router-link to= "/">
            <p class="menu__item home" >Home</p>
          </router-link>         
          <div class="menu__item dropdown" ref="dropdown">
            <button @click.stop="toggleMenu" >Genres</button>          
            <menu  class="dropdown__list"
              :class="{'dropdown__list-active':menuOpen}"          
            >
              <li
                class="dropdown__list__item"
                v-for = "genre in genres" :key=genre.id value=genre.id
                @click.stop="setGenreData(genre.id, genre.name)"              
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
              <input 
                @keyup="getSearchResult"
                v-model.trim="searchKeyword" 
                type="text" placeholder="Movie" 
                class="search-input" ref="input">
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
      isSearchBoxOpen: false,
      searchKeyword:"",
      timer:"",
      navOnTop: true
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
    toggleMenu() {
      this.menuOpen = !this.menuOpen
      this.isSearchBoxOpen = false
      //當dropdown menu 打開時切換nav背景色
      if(this.menuOpen){
        this.navOnTop = false
      } 
    },
    close( {target} ) {
      //點擊其他地方將menu和search box關閉 
      this.menuOpen = false
      if (this.isSearchBoxOpen) {
      this.$nextTick(() => {
          if (!this.$refs.search.contains(target)) {
          this.isSearchBoxOpen = false
        }
      })       
    }        
    },
    openSearchBox() {
      this.isSearchBoxOpen = !this.isSearchBoxOpen   
      this.menuOpen = false
      this.$refs.input.focus()  
    },
    setGenreData(genreId, name){
      this.toggleMenu()
      this.$router.push({
        name:"Genre", 
        query: {
          id: genreId,
          name
        }
      })
    },
    getSearchResult(){  
      this.debounce(this.search)
    },
    search() {
      const keyWord = this.searchKeyword.trim()
       //無輸入搜尋關鍵字時回首頁
      if (!keyWord) {
        this.$router.push({name: "home"})
        return
      }
      //移除頭尾、字中的空格
      this.$router.push( 
        { 
          name:"SearchResult", 
          query: {query: keyWord} 
        } 
      )
    },
    debounce(search){
      //每次輸入時移除計時器，停止輸入後經過0.05秒再執行函式search前往搜尋頁面，向api發送請求取得搜尋結果
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        search()
      }, 500)
    },
    handleScroll(){
      //dropdown menu打開時不觸發
      if(this.menuOpen) return

      if(window.scrollY < 20 ) {
        this.navOnTop = true
      } else{
        this.navOnTop = false
      }
    }
  },
  mounted(){
    //scroll離開top 後 navTap 背景變色
    window.addEventListener('scroll', this.handleScroll)
    //點擊關閉視窗監聽器
    window.addEventListener('click', this.close)
   
  },
  created() {
    this.getGenres()   
  },
  beforeDestroy() {
    window.removeEventListener('click', this.close)
    window.removeEventListener('scroll', this.handleScroll)
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
    background: $gray;
    z-index: 99;
    &.navOnTop {
      background-image: linear-gradient(180deg,rgba(0,0,0,.7) 10%,transparent);
      background: transparent;
    }
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
      cursor: pointer;
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
    .dropdown__list {
      position: absolute;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      justify-items: center;
      gap: 1rem;
      width: 100%;
      left: -50%;
      transform: translateX(50%) scale(1, 0) ;
      padding: 1rem;
      background: $gray;
      transition: transform .3s ease-out;
      transform-origin: top;
      //打開drop down
      &.dropdown__list-active {
        transform: translateX(50%) scale(1, 1) ;
        .dropdown__list__item {
          opacity: 1;
          transition: opacity .2s ease-in .2s;
        }    
      }
    }
    .dropdown__list__item  {
      opacity: 0;
      &:hover{
        color: $font-gray;
      }
    }
    &__item {
      text-align: center;     
    }    
  }
  .search-bar {
    justify-content: flex-end;
    position: absolute;
    right: 4%;
    display: flex;
    height: 30px;
    width: 25%;
    max-width: 350px;
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