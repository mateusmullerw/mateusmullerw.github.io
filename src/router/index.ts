import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    meta: {
      title: 'Mateus Müller'
    },
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/project/:slug",
    name: "ProjectDetails",
    props: true,
    component: () =>
      import("../views/ProjectDetails.vue")
  }
];

const router = new VueRouter({
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
