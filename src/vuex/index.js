import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let modules = {}

const requireModules = require.context('./', true, /\.js$/)
requireModules.keys().forEach(item => {
  let module = requireModules(item).default
  if(module && module.name && module.namespaced) {
    modules[module.name] = module
  }
})

export function createStore() {
  return new Vuex.Store({
    modules,
    strict: true
  })
}
