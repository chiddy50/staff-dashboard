import Vue from "vue";
import VueRouter from "vue-router";
// import Helper from "../helpers/functions";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: () => import("../views/dashboard.vue"),
    // beforeEnter: async (to, from, next) => {
    //   let check = await Helper.isadmin();
    //   if (check) {
    //     next();
    //   } else {
    //     next({
    //       path: '/login/:schoolid',
    //     });
    //   }
    // },
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/assignment",
    name: "Assignment",
    component: () => import("../views/Assignment.vue"),
  },
  
  {
    path: "/manage-progress/:id",
    name: "ManageProgress",
    component: () => import("../views/ManageProgress.vue"),
  },
  
  {
    path: "/timetable",
    name: "timetable",
    component: () => import("../views/Timetable.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/Profile.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/class",
    name: "class",
    component: () => import("../views/Classes.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/wallet",
    name: "wallet",
    component: () => import("../views/Wallet.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
