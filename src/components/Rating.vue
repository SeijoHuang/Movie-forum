<template>
  <div class="rating-container">
    <div class="star-icon">
      <span class="icon-star-full"></span>
    </div>
    <div class="content-container">
      <p class="score"><span class="bold">{{rating}}</span> / 10</p>
      <p class="vote-count">
        {{voterCal}} 
        <span class="icon-user"></span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name:"Rating",
  props: {
    rating:{
      type: Number
    },
    voteCount: {
      type: Number
    }
  },
  computed: {
    voterCal: function() {
      if(this.voteCount / 1000 < 1) return this.voteCount
      // 四捨五入至小數點第二位
      return Math.round( (this.voteCount / 1000) * 100)/100 + 'k '
    }
  }
}
</script>
<style lang="scss" scoped>
  .rating-container {
    display: flex;
    align-items: center;
    gap: .5rem;
    font-size: 0.8rem;
    letter-spacing: 1px;
  }
  .icon-star-full {
    color: #F5C517;
    font-size: 1.8rem;
  }
  
  .bold {
    font-weight: 900;
    font-size: 1.2rem;
  }
</style>