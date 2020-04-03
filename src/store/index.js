import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    botMode: true
  },
  mutations: {
    //处理底部显示隐藏函数
    Handle_Bottom(state, modes) {
      state.botMode = modes;
    }
  },
  actions: {},
  modules: {}
});
