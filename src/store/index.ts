import app from './modules/app';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

import { createStore } from 'vuex';

export default createStore({
  state: {},
  mutations,
  actions,
  getters,
  modules: {
    app
  }
});
