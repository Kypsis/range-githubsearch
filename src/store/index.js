import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bookmarks: [],
    loading: false,
    previousBookmarks: null,
    readme: "",
    repositoryDetails: {},
    results: [],
    showToast: false,
    timer: null,
    toastMessage: ""
  },
  mutations: {
    addBookmark(state, payload) {
      if (state.bookmarks.some(bookmark => bookmark.link === payload.link)) {
        return;
      }
      state.toastMessage = "Added";
      state.previousBookmarks = state.bookmarks;
      state.bookmarks = [...state.bookmarks, payload];
      state.showToast = true;
    },
    removeBookmark(state, payload) {
      state.toastMessage = "Removed";
      state.previousBookmarks = state.bookmarks;
      state.bookmarks = state.bookmarks.filter(
        bookmark => bookmark.link !== payload
      );
      state.showToast = true;
    },
    undoBookmark(state) {
      state.bookmarks = state.previousBookmarks;
      state.showToast = false;
    },
    clearReadme(state) {
      state.readme = "";
    },

    setLoading(state) {
      state.loading = !state.loading;
    },
    hideToast(state) {
      state.showToast = false;
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
    undoBookmark(context) {
      context.commit("undoBookmark");
    },
    clearReadme(context) {
      context.commit("clearReadme");
    },
    setLoading(context) {
      context.commit("setLoading");
    },
    hideToast(context) {
      clearTimeout(context.state.timer);
      context.state.timer = setTimeout(() => {
        context.commit("hideToast");
      }, 5000);
    },
    searchForRepositories(context, query) {
      context.dispatch("setLoading");
      axios
        .get(`https://api.github.com/search/repositories?q=${query}`)
        .then(response => {
          context.commit("searchForRepositories", response.data.items);
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
        })
        .catch(error => {
          console.log(error.message);
        });
    },
    fetchReadme(context, slug) {
      context.dispatch("setLoading");
      axios
        .get(`https://api.github.com/repos/${slug}/readme`)
        .then(response => {
          context.commit("fetchReadme", atob(response.data.content));
        })
        .then(() => context.dispatch("setLoading"))
        .catch(error => {
          console.log(error.message);
        });
    }
  },
  plugins: [createPersistedState({ paths: ["bookmarks"] })],
  modules: {}
});
