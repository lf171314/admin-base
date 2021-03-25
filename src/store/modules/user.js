import * as User from './user'

export default {
  state: {
    userInfo: User.getUserInfo() || {},
    roleAuth: [],
    token: User.getToken() || ''
  },
  getters: {
    userInfo: state => state.userInfo,
    roleAuth: state => state.roleAuth,
    token: state => state.token
  },
  mutations: {
    SET_USER_INFO(state, payload) {
      state.userInfo = payload
    },
    SET_ROLE_AUTH(state, payload) {
      state.roleAuth = payload
    },
    SET_TOKEN(state, payload) {
      state.token = payload
    }
  },
  actions: {
    getUserInfo({ commit }, userInfo) {
      commit('SET_USER_INFO', userInfo)
    }
  }
}
