import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './vuex/index'


Vue.config.devtools = true
// 此方法每次返回一个 新的vue 对象   router 对象 和 vuex对象
export function createApp() {
  // 创建 router 和  vuex 实例
  const router = createRouter()
  const store = createStore()
  // 此方法用于将路由的状态同步到 vuex 中
  // sync(store, router)
  //  创建Vue 实例 注入路由和 vuex 
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  // 暴露出去
  return { app, store, router }
}