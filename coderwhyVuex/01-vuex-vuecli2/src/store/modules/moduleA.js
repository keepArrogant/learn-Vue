export default {
  state: {
    name: 'zhangsan'
  },
  mutations: {
    updateName(state, payload) {
      state.name = payload
    }
  },
  getters: {
    fullname(state) {
      return state.name + '1111'
    },
    fullname2(state, getters) {
      return getters.fullname + '22222'
    },
    fullname3(state, getters, rootState) {
      return getters.fullname2 + rootState.count
    }
  },
  actions: {
    aUpdateName(context) {
      console.log(context)
      setTimeout(() => {
        context.commit('updateName', 'wangwu')
      }, 1000)
    }
  }
}
