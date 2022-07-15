<template>
  <div id="app">
    <Nav />
    <router-view/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import Nav from "./components/NavTab.vue"
export default {
  components: {
    Nav
  }  
}
</script>

<style lang="scss">
html {
  background: black;
}
*{
  color: $font-white;
}
</style>
