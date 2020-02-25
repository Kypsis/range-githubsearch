import Vue from "vue";
import VueRouter from "vue-router";
import Search from "../views/Search.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Search",
    component: Search
  },
  {
    path: "/bookmarks",
    name: "Bookmarks",
    component: () => import("../views/Bookmarks.vue")
  },
  {
    path: "/details",
    name: "RepositoryDetails",
    component: () => import("../views/RepositoryDetails.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
