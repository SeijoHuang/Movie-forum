import Vue from 'vue'
import App from './App.vue'
import "./assets/scss/reset.scss"
import router from './router'
import { Toast } from "./utils/helpers"
import "@/assets/iconmoon/style.css"

Vue.config.productionTip = false

Vue.prototype.$toast = function ( icon , title) {
  Toast.fire ({
    icon,
    title
  })
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
