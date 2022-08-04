<template>
  <div class="rating-container">
    <div class="star-icon">
      <span class="icon-star-full"></span>
    </div>
    <div class="content-container">
      <p class="score">
        <span class="bold">
          <slot name="rating"></slot>
        </span> / 10
        
        </p>
      <p class="vote-count">
        <slot name="voteCount"></slot>
        <span class="icon-user"></span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name:"Rating",
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