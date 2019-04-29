// import api from '@/api' // 导入api接口对象集合
export default {
  name: 'common',
  namespaced: true,
  state: {},
  getters: {},
  actions: {
    async fetchUserInfo({commit}, config) {
      try {
        console.log(1)
        // let data = await api.user.read()
      } catch (error) {
        console.log(error)
      }
    },
  },
  mutations: {},
}