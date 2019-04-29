import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'homepage',
        component: () => import(/* webpackChunkName: "homepage" */ '@/views/HomePage.vue')
      },
    ]
  })
}
