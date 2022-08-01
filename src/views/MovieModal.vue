<template>
  <div class="movie-modal">
    <div class="modal">
      <div class="form" action="submit">
        modal content
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .modal {
  position: fixed; 
  z-index: 100; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%; 
  overflow-y: scroll; 
  background-color: rgb(0, 0, 0); 
  background-color: rgba(0, 0, 0, 0.4); 
}
  .form {
    color: black;
    position: absolute;
    margin-top: 2rem;
    left: 50%;
    // top: 50%;
    transform: translateX(-50%);
    z-index: 100;
    opacity: 100;
    width: 100%;
    // height: 100%;
    background: white;
    border: 1px solid grey;
    border-radius: 8px;
    // overflow: scroll;
    @media screen and (min-width:577px) {
      width: 95%;
    }
    @media screen and (min-width:993px) {
      width: 80%;
    }
    @media screen and (min-width:993px) {
      width: 70%;
    }
  }

</style>