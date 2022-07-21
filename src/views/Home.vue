<template>
  <div class="home">
    <MainSlide />
    <template v-if="isOpen">
      <router-view/>
    </template>
    
  </div>
</template>

<script>
import MainSlide from "../components/MainSlide.vue"
export default {
  name: 'Home',
  components: {
    MainSlide
  },
  data(){
    return {
      isOpen: true,
    }
  }
}
</script>
