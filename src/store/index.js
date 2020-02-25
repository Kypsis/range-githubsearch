import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bookmarks: [],
    repositoryDetails: {},
    loading: false,
    results: [],
    readme: ""
  },
  mutations: {
    addBookmark(state, payload) {
      if (state.bookmarks.some(bookmark => bookmark.link === payload.link)) {
        return;
      }
      state.bookmarks = [...state.bookmarks, payload];
    },
    removeBookmark(state, payload) {
      state.bookmarks = state.bookmarks.filter(
        bookmark => bookmark.link !== payload
      );
    },
    setLoading(state) {
      state.loading = !state.loading;
    },
    searchForRepositories(state, payload) {
      state.results = payload;
    },
    fetchRepository(state, payload) {
      state.repositoryDetails = payload;
    },
    fetchReadme(state, payload) {
      state.readme = payload;
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
    searchForRepositories(context, query) {
      context.dispatch("setLoading");
      axios
        .get(`https://api.github.com/search/repositories?q=${query}`)
        .then(response => {
          context.commit("searchForRepositories", response.data.items);
          console.log(response.data);
        })
        .then(() => context.dispatch("setLoading"))
        .catch(error => {
          console.log(error.message);
        });
    },
    fetchRepository(context, slug) {
      axios
        .get(`https://api.github.com/repos/${slug}`)
        .then(response => {
          context.commit("fetchRepository", response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.log(error.message);
        });
    },
    fetchReadme(context, slug) {
      axios
        .get(`https://api.github.com/repos/${slug}/readme`)
        .then(response => {
          context.commit("fetchReadme", atob(response.data.content));
          console.log(response.data);
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  },
  plugins: [createPersistedState({ paths: ["bookmarks"] })],
  modules: {}
});
