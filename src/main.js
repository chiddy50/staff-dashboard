import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Axios from "axios";
import VueAxios from "vue-axios";
import Multiselect from "vue-multiselect";


import show from "@/views/show";
import analytics from "@/components/analytics/analytics";
import profilecom from "@/components/profilecom/profilecom";
import timetablecom from "@/components/timetablecom/timetablecom";
import classes from "@/components/class/Classes";
import wallet from "@/components/wallet/wallet";
import assignment from "@/components/assignment/Assignment";
import manageProgress from "@/components/assignment/ManageProgress";

import preloader from "@/components/preloader/preloader";


Vue.component("show", show);
Vue.component("analytics", analytics);
Vue.component("timetablecom", timetablecom);
Vue.component("profilecom", profilecom);
Vue.component("classes", classes);
Vue.component("wallet", wallet);
Vue.component("assignment", assignment);
Vue.component("manageProgress", manageProgress);
Vue.component("preloader", preloader);
Vue.component("Multiselect", Multiselect);

import "@/assets/css/style.css";
import "@/assets/css/login.css";
import "@/assets/css/utilities.css";
import "@/assets/css/boxicons.min.css";
import "boxicons";

// import introJs from 'intro.js'
// Vue.use(introJs);
// import 'intro.js/introjs.css';

import { ValidationProvider, extend, ValidationObserver } from "vee-validate";

let jquery = require("jquery");
window.$ = window.jQuery = jquery;
import "popper.js";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-multiselect/dist/vue-multiselect.min.css";


// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

Vue.use(VueAxios, Axios);
Axios.defaults.baseURL = "https://cirportalbackend.herokuapp.com/";

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    let check = localStorage.getItem("auth_staff");
    if (!check) {
      next({
        path: `/login`,
      });
      // let schoolID = localStorage.getItem("school_id");
      // if (schoolID) {

      // } else {
      //   next({
      //     path: "/unauthorized",
      //   });
      // }
    } else {
      next();
    }
  } else {
    // to.name == "Login"
    //   ? to.params.schoolid.length != 24
    //     ? next({
    //         path: "/unauthorized",
    //       })
    //     : next()
    //   :
    next();
  }
});

Axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (
      error.response.status == 401 &&
      error.response.data.error == "invalid_token"
    ) {
      store.dispatch("logout");
    }
    return Promise.reject(error.response.data);
  }
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
