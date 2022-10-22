export default {
  namespaced: true,
  state: {
    userInfo: {},
    database: null, //天眼查 汇法网  企查查
  },
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data
    },
    setDatabase(state, data) {
      state.database = data.user.datasource
    },
  },

  actions: {
    setUserInfo({
      commit
    }, data) {
      return new Promise(resolve => {
        commit('setUserInfo', data)
        resolve(data)
      })
    }
  }
}
