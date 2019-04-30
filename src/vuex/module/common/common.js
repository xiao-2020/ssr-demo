// import api from '@/api' // 导入api接口对象集合
export default {
  name: 'common',
  namespaced: true,
  state: {
    homepage: ''
  },
  getters: {},
  actions: {
    async fetchUserInfo({commit}, config) {
      try {
        console.log(1)
        // let data = await api.user.read()
        commit('setHomepage')
      } catch (error) {
        console.log(error)
      }
    },
  },
  mutations: {
    setHomepage(state) {
      state.homepage = Math.random()
    }
  },
}