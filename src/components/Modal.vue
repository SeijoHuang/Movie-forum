<template>
  <div class="modal__container">  
    <div class="modal"> 
      <div class="modal__content" ref="modal">
        <div class="close-btn" @click.stop="closeModal">
          <span class="icon-close"></span>
        </div>
        <div class="modal__content-container">
          <slot> 
          </slot>
        </div>        
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {
  name: "Modal",
  methods: {
    closeModal(){
      this.$store.commit("toggleModal")
      const body = document.querySelector("body")
      if( !this.isModalOpen) {
        body.style.overflowY = "scroll"
      }
    },
    closeModalWhenClickOutside( {target} ){
      if ( target.classList.contains("modal-active") ) return
      
      if ( this.isModalOpen ) {
        //點擊modal以外的區塊關閉modal
        if (!this.$refs.modal.contains(target)) {
          this.closeModal()
        }
      }     
    }
  },
  computed: {
    ...mapState( ["isModalOpen", "isLoading"])
  },
  mounted(){
    window.addEventListener('click', this.closeModalWhenClickOutside)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.close)
  }
}
</script>
<style lang="scss" scoped>
  .modal {
    position: fixed; 
    z-index: 100; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow-y: scroll; 
    background-color: rgba(0, 0, 0, .6); 
  }
  .modal__content {
    position: relative;
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
    background: $gray;
    
    // overflow: scroll;
    @media screen and (min-width:577px) {
      width: 95%;
      border-radius: 8px;
    }
    @media screen and (min-width:993px) {
      width: 80%;
    }
    @media screen and (min-width:993px) {
      width: 70%;
    }
    .close-btn {
      @extend %icon-circle;
      width: 2rem;
      height:2rem;
      border: unset;
      position: absolute;
      right: 2%;
      top: 2%;
      text-align: center;
      line-height: 2rem;
      z-index: 1;
      @media screen and (max-width:576px) {
        top: 5px;
      }
    }
    .icon-close {
      @extend %icon;
      font-size: 1.8rem;
      line-height: 2rem;
    }
  }

</style>