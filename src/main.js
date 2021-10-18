import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Axios from "axios";
import VueAxios from "vue-axios";
import Multiselect from "vue-multiselect";

import wysiwyg from "vue-wysiwyg";
Vue.use(wysiwyg, {}); // config is optional. more below

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
});

import "vue-wysiwyg/dist/vueWysiwyg.css";

import show from "@/views/show";
import analytics from "@/components/analytics/analytics";
import profilecom from "@/components/profilecom/profilecom";
import timetablecom from "@/components/timetablecom/timetablecom";
import classes from "@/components/class/Classes";
import wallet from "@/components/wallet/wallet";
import classwork from "@/components/classwork/Classwork";
import exam from "@/components/exam/Exam";

import assignment from "@/components/assignment/Assignment";
import manageProgress from "@/components/assignment/ManageProgress";
import assignmentForm from "@/components/assignment/AssignmentForm";
import communication from "@/components/communication/Communication";
import subclass_students from "@/components/subclass_students/SubclassStudents";

import preloader from "@/components/preloader/preloader";

Vue.component("show", show);
Vue.component("analytics", analytics);
Vue.component("timetablecom", timetablecom);
Vue.component("profilecom", profilecom);
Vue.component("classes", classes);
Vue.component("wallet", wallet);
Vue.component("assignment", assignment);
Vue.component("manageProgress", manageProgress);
Vue.component("assignmentForm", assignmentForm);
Vue.component("communication", communication);
Vue.component("classwork", classwork);
Vue.component("exam", exam);

Vue.component("subclass_students", subclass_students);

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

Axios.defaults.baseURL = "https://cirportalbackend.herokuapp.com/";
// Axios.defaults.headers.common['Authorization'] =  `Bearer ${localStorage.getItem("auth_staff")}`; 

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    let check = localStorage.getItem("auth_staff");
    if (!check) {
      next({
        path: `/login`,
      });
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
    console.log(response);
    return response;
  },
  function(error) {
    if (error.response.status == 401 && error.response.data.error == "invalid_token") {
      store.dispatch("logout");
    }
    return Promise.reject(error.response.data);
  }
);

Vue.use(VueAxios, Axios);
Vue.prototype.$axios = Axios;

Vue.filter("dateFilter", function(value) {
  if (!value) return "";
  let data = new Date(value).toDateString();
  return data;
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
