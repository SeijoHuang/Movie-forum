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