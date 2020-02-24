import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    results: [],
    loading: false
  },
  mutations: {
    fetchData(state, payload) {
      state.results = payload;
    },
    setLoading(state) {
      state.loading = !state.loading;
    }
  },
  actions: {
    setLoading(context) {
      context.commit("setLoading");
    },
    fetchData(context, query = "web") {
      context.dispatch("setLoading");
      axios
        .get(`https://api.github.com/search/repositories?q=${query}`)
        .then(response => {
          context.commit("fetchData", response.data.items);
        })
        .then(() => context.dispatch("setLoading"))
        .catch(error => {
          console.log(error.message);
        });
    }
  },

  modules: {}
});
