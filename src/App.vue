<template>
  <div id="app">
    <Nav />
    <router-view/>
    <template v-if="isModalOpen">
       <MovieModal />
    </template>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import Nav from "./components/NavTab.vue"
import MovieModal from "./components/MovieModal.vue"
import { mapState } from "vuex"
export default {
  components: {
    Nav,
    MovieModal
  },
  computed: {
    ...mapState(["isModalOpen"])
  }
}
</script>

<style lang="scss">
html {
  background: $gray;
}
*{
  color: $font-white;
}
</style>
