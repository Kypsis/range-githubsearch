import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bookmarks: [],
    loading: false,
    results: []
  },
  mutations: {
    addBookmark(state, payload) {
      state.bookmarks = [...state.bookmarks, payload];
    },
    removeBookmark(state, payload) {
      state.bookmarks = state.bookmarks.filter(
        bookmark => bookmark.link !== payload
      );
    },
    fetchData(state, payload) {
      state.results = payload;
    },
    setLoading(state) {
      state.loading = !state.loading;
    }
  },
  actions: {
    addBookmark(context, link) {
      context.commit("addBookmark", link);
    },
    removeBookmark(context, link) {
      context.commit("removeBookmark", link);
    },
    setLoading(context) {
      context.commit("setLoading");
    },

    fetchData(context, query = "web") {
      context.dispatch("setLoading");
      axios
        .get(`https://api.github.com/search/repositories?q=${query}`)
        .then(response => {
          context.commit("fetchData", response.data.items);
          console.log(response.data);
        })
        .then(() => context.dispatch("setLoading"))
        .catch(error => {
          console.log(error.message);
        });
    }
  },

  modules: {}
});
