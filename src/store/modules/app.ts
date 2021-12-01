import { Module } from 'vuex';

interface IState {
  device: string;
  status: string;
}

const module: Module<IState, {}> = {
  namespaced: true,
  state: {
    status: process.env.NODE_ENV,
    device: 'desktop'
  },
  mutations: {
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    }
  },
  actions: {
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device);
    }
  }
};

export default module;
