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
      <li v-show="page.showPrevMore" class="collapsePrev">...</li>
      <li class="page" v-for="item in page.pageArr" :key="item"
        :class="{active: page.currentPage === item }"
        @click.stop="changePage(item)"
      >
        {{item}}
      </li>
      <li v-show="page.showNextMore" class="collapseNext">...</li>
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
import store from "../store"
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
     
      this.$router.push({
        name: "SearchResult",
        query: {
          page: pageNum,
          query: this.$route.query.query
        }
      })
      const {name} = this.$route
      console.log(name)
      const {page, query} = this.$route.query
      store.dispatch("getSearchResult", {page, query})
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
    ...mapState(["page", "isLoading"]),
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
    margin: 2rem 0;
  }
  .page-list {
    display: flex;
    gap: .5rem;
    .page {
      width: 2rem;
      height: 2rem;
      text-align: center;
      line-height: 2rem;
      // background: $pop-up-card;
      border-radius: 5px;
      cursor: pointer;
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
