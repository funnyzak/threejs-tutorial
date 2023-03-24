import { createStore } from 'vuex';
import app from './modules/app';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default createStore({
  state: {},
  mutations,
  actions,
  getters,
  modules: {
    app
  }
});
