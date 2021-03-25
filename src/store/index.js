import Vue from 'vue'
import Vuex from 'vuex'
import path from 'path'

const files = require.context('./modules', true, /\.js$/)
const modules = {}
files.keys().forEach(file => {
  const name = path.basename(file, '.js')
  modules[name] = files(file).default || files(file)
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  modules
})
