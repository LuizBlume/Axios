import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/movies',
      name: 'Movies',
      component: () => import('../views/MoviesView.vue'),
    },
    {
      path: '/tv',
      name: 'TV',
      component: () => import('../views/TvView.vue'),
    },
    {
      path: '/movie/:movieId',
      name: 'MovieDetails',
      component: () => import('../views/MovieDetailsView.vue'),
      props: true,
    },
    {
      path: '/tv/:tvId',
      name: 'TvDetails',
      component: () => import('../views/TvDetailsView.vue'),
      props: true,
    },
  ],
})

export default router
