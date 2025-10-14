import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import IntroView from '../views/IntroView.vue'
// import Index from '@/components/MovieIndexPage'
// import Show from '@/components/MovieShowPage'

const routes = [
  {
    path: '/',
    name: 'home',
    component: IntroView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/intro',
    name: 'intro',
    component: IntroView
  },
  // {
  //  path: '/',
  //  name: 'index',
  //  component: Index
  // },
  // {
  //  path: '/:id',
  //  name: 'show',
  //  component: Show
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
