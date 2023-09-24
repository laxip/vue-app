import axios from "axios";

export default {
  namespaced: true,
  state: {
    data: undefined,
  },
  actions: {
    async load(context) {
      if (!context.state.data) {
        const response = await axios("/countries.json");

        context.commit("update", response.data);
      }
    },
  },
  mutations: {
    update(state, countries) {
      state.data = countries;
    },
  },
};
