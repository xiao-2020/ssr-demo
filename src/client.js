import { createApp } from './main'

const { app, router, store } = createApp()

if(window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__) // 将已有的state状态 合并添加到客户端本地的 store 对象里
}

app.$mount('#app')
