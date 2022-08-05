import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    children: [
      {
        path: "movies/:id",
        name: "MovieModal",
        component: () => import("../components/MovieModal.vue"),
      },
    ],
  },
  {
    path: "/genre/:genreId",
    name: "genre",
    component: () => import("../views/Genre.vue"),
  },
  {
    path: "/search",
    name: "SearchResult",
    component: () => import("../views/SearchResult.vue"),
  },
]

const router = new VueRouter({
  routes
})

export default router
