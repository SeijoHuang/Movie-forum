<template>
  <div class="page-layout">
    <div class="container">
      <div class="row row-cols-3 row-cols-sm-4 row-cols-lg-6 gx-4 gy-5">
        <slot name="movie-card" />
      </div>
    </div>
    <div class="pagination-container">
      <Pagination />
    </div>
  </div>  
</template>

<script>
import Pagination from "../components/Pagination.vue"
export default {
  name: "PageLayout",
  components: {
    Pagination
  }

}
</script>
<style lang="scss" scoped>
//TODO:RWD hover hidden card調整
  .container {
    margin: 0;
    padding: 2rem 4%;
    @media screen and (min-width: 576px){
      max-width: unset;
    }
    @media screen and (min-width: 768px){
      max-width: unset;
    }
    @media screen and (min-width: 992px){
      max-width: unset;
    }
  }
  .col {
    margin-bottom: 1rem;
  }
 
</style>