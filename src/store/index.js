import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    results: []
  },
  mutations: {
    fetchData(state, payload) {
      state.results = payload;
    }
  },
  actions: {
    fetchData(context, query = "web") {
      axios
        .get(`https://api.github.com/search/repositories?q=${query}`)
        .then(response => {
          context.commit("fetchData", response.data.items);
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  },
  modules: {}
});
