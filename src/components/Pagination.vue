<template>
  <div class="page-container">
    <ul class="page-list">
      <li v-if="page.totalPages > 1" class="page prev"
         @click.stop="changePage(page.currentPage - 1)"
      >
        <span class="icon-arrow_lift" aria-hidden="true"></span>
      </li>
      <li  v-if="page.totalPages > 1" class="page start-page"
         :class="{active: page.currentPage === 1 }"
         @click.stop="changePage(1)"
      >
        1
      </li>
      <li v-show="page.showPrevMore" class="collapsePrev page">...</li>
      <li class="page" v-for="item in page.pageArr" :key="item"
        :class="{active: page.currentPage === item }"
        @click.stop="changePage(item)"
      >
        {{item}}
      </li>
      <li v-show="page.showNextMore" class="collapseNext page">...</li>
      <li  v-if="page.totalPages > 1" class="page total-page"
        :class="{active: page.currentPage === page.totalPages }"
        @click.stop="changePage(page.totalPages)"
      >
        {{page.totalPages}}
      </li>
      <li v-if="page.totalPages > 1 " class="page next"
        @click.stop="changePage(page.currentPage + 1)"
      >
        <span class="icon-arrow_lift" aria-hidden="true"></span>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {
  name: "Pagination",
  data(){
    return {
      isActive: false
    }
  },
  methods: {
    changePage(pageNum){
      const {currentPage, totalPages} = this.page
      if (pageNum > totalPages || pageNum < 1 || pageNum === currentPage) return    
      const {name: params} = this.$route
      const {query, id, name} = this.$route.query
      //按路由的params切換頁面
      switch ( params ){
        //搜尋頁面
        case "SearchResult":      
          this.$router.push({
            name: "SearchResult",
            query: {
              page: pageNum,
              query
            }
          })
          break
        // 電影類別頁面
        case "Genre" :
          this.$router.push({
            name: "Genre",
            query: {
              page: pageNum,
              id,
              name
            }
          })
          break
      }      
    },
    toggleActive(num){
      if (num !== this.page.currentPage) {
        this.isActive = false
        return
      }
      this.isActive = true

    }
  },
  computed: {
    ...mapState(["page", "isLoading", "genreOnShow"]),
  },
  mounted(){
    const {page} = this.$route.query
    this.toggleActive(page)
  }
}
</script>
<style lang="scss" scoped>
  .page-container {
    display: flex;
    justify-content: center;
    margin: 2rem auto;
    max-width: 450px;
  }
  .page-list {
    display: flex;
    width: 90%;
    gap: .3rem;   
    @media screen and (min-width: 577px) {
      gap: .5rem;
    }
    .page {
      text-align: center;
      line-height: 2rem;
      border-radius: 5px;
      cursor: pointer;
      font-size: .8rem;
      @media screen and (min-width: 577px) {
        font-size: 1rem;       
      }
    }
    li {
      flex:1 1 2rem;
    }
    .next {
      transform: rotate(180deg);
    }
    .icon-arrow_lift {
      line-height: 2rem;
    }
    .active {
      background: $pop-up-card;
    }
  }

  
</style>
