/*
 * @Author: yz
 * @Date: 2022-06-08 15:42:48
 * @Description: 
 * 
 */
const state = {
  isCollapse: false,
  loading: false
}

const mutations = {
  setCollapse(state, val) {
    state.isCollapse = val;
  }
}

const actions = {
  setCollapse({
    commit
  }, val) {
    commit("setCollapse", val)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
