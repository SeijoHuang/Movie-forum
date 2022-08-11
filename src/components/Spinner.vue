<template>
  <div class="spinner-container">
    <div class="loader"></div>
  </div>
</template>
<style lang="scss" scoped>
  .loader {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: block;
    margin: 25% auto;
    position: relative;
    color: #fff;
    left: -100px;
    box-sizing: border-box;
    animation: shadowRolling 2s linear infinite;
}

@keyframes shadowRolling {
  0% {
    box-shadow: 0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0),
      0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
  }
  12% {
    box-shadow: 100px 0 $red, 0px 0 rgba(255, 255, 255, 0),
      0px 0 rgba(255, 255, 255, 0), 0px 0 rgba(255, 255, 255, 0);
  }
  25% {
    box-shadow: 110px 0 $red, 100px 0 $red, 0px 0 rgba(255, 255, 255, 0),
      0px 0 rgba(255, 255, 255, 0);
  }
  36% {
    box-shadow: 120px 0 $red, 110px 0 $red, 100px 0 $red,
      0px 0 rgba(255, 255, 255, 0);
  }
  50% {
    box-shadow: 130px 0 $red, 120px 0 $red, 110px 0 $red, 100px 0 $red;
  }
  62% {
    box-shadow: 200px 0 rgba(255, 255, 255, 0), 130px 0 $red, 120px 0 $red,
      110px 0 $red;
  }
  75% {
    box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0),
      130px 0 $red, 120px 0 $red;
  }
  87% {
    box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0),
      200px 0 rgba(255, 255, 255, 0), 130px 0 $red;
  }
  100% {
    box-shadow: 200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0),
      200px 0 rgba(255, 255, 255, 0), 200px 0 rgba(255, 255, 255, 0);
  }
}

</style>