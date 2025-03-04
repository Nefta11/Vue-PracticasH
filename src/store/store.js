import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoggedIn: false
  },
  mutations: {
    setLoggedIn(state, status) {
      state.isLoggedIn = status;
    }
  },
  actions: {},
  modules: {}
});
