import { createApp } from './main'

// 导出一个函数， 返回  一个promise  
export default context => {
  return new Promise((resolve, reject) => {
    // 获取 app router vuex 实例
    const { app, router, store } = createApp()

    // 导航到一个url地址
    router.push(context.url) 
    // 此方法保证 所有的异步进入钩子和路由初始化相关联的异步组件已经 解析 好了  为了保证客户端和服务端数据一致
    router.onReady(() => {
      // 获取匹配到的组件    getMatchedComponents  返回目标位置或是当前路由匹配的组件数组
      let matchedComponents = router.getMatchedComponents()
      // 没有匹配到 返回404
      if(!matchedComponents.length) {
        return reject({code: 404})
      }
      // 调用所有匹配到的路由组件调用 asyncData    asyncData 返回promise对象
      Promise.all(matchedComponents.forEach(Component => {
        if(Component.asyncData) {
          return Component.asyncData({
            store, // vuex 对象
            route: router.currentRoute // 当前路由对应的路由信息对象
          })
        }
      })).then(() => {
        // 当 template 选项用在了 renderer 上面时(我们用了)  vuex 中的 state 状态
        // 会自动序列化为 window.__INITIAL_SATAE__, 并注入到了 html 里面  返回到客户端 
        //  客户端 应该在挂载之前 将此数据初始化到 客户端的 state 里面
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}