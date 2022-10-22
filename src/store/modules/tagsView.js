const state = {
  tagsViewList: [],
  currentTagView: ""
}

const mutations = {
  addView(state, data) {
    state.tagsViewList.push(data);
  },
  setView(state, data) {
    state.tagsViewList = data
  },
  delVisitedView(state, data) {
    state.tagsViewList.map((v, i) => {
      if (v.path == data.path) {
        state.tagsViewList.splice(i, 1)
      }
    })
  },
  delOtherView(state, data) {
    state.tagsViewList = state.tagsViewList.filter(v => {
      if (v.meta.isAffix || v.path == data.path) {
        return true
      } else {
        return false
      }
    })
  },
  delAllView(state, data) {
    state.tagsViewList = state.tagsViewList.filter(v => {
      if (v.meta.isAffix) {
        return true
      } else {
        return false
      }
    })
  },
  setCurrentTagView(state, data) {
    if (data) {
      state.currentTagView = data;
    }
  },
}

const actions = {
  addView({
    commit
  }, data) {
    commit("addView", data);
  },

  delAllTagsView({
    commit
  }, data) {
    return new Promise(resolve => {
      commit('setView', [])
      resolve()
    })
  },

  delVisitedView({
    commit
  }, data) {
    commit("delVisitedView", data);
  },

  delOtherView({
    commit
  }, data) {
    commit("delOtherView", data);
  },

  delAllView({
    commit
  }, data) {
    commit("delAllView", data);
  },

  setCurrentTagView({
    commit
  }, data) {
    commit("setCurrentTagView", data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
