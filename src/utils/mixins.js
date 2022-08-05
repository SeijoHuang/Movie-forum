import store from "../store"

export const visitPage = {
  methods: {
    jumpToHome(){
      this.$router.push('/')
    },
    jump(name, id){
      this.$router.push({
        name,
        params:{id}
      })
    }
  }
}
export const modalController = {
  methods: {
    toggleModal(id){
      const body = document.querySelector("body")
      // 更改store中modal的狀態和存取電影資料
      this.$store.commit("toggleModal")
      //modal開啟後背景固定不scroll
      if (this.isModalOpen) {
        body.style.overflow = "hidden"
      } else {
        body.style.overflow = "scroll"
      }
      // 觸發store action 存取電影資料
      store.dispatch("getMovieData", id)
    }
  }
}