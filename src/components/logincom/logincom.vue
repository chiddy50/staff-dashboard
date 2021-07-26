<template>
  <div id="login-page">
    <section id="login__container">
      <div class="contentBx">
        <div class="formBx">
          <!-- <h2>Login</h2> -->
          <img src="../../assets/img/logo.png" class="w-32 mb-4" style="margin: 0 auto;" />
          <form action="">
            <div class="inputBx">
              <span>Student ID</span>
              <div class="input_container">
                <input
                  type="text"
                  v-model="student.student_id"
                  name="username"
                />
              </div>
            </div>
            <div class="inputBx">
              <span>Password</span>
              <div class="input_container">
                <input
                  :type="passwordType"
                  v-model="student.credential"
                  name="password"
                />
                <i
                  @click="togglePassword"
                  :class="setPasswordIcon(passwordType)"
                  class="bx show_password"
                ></i>
              </div>
            </div>
            <div class="remember text-xs">
              <input type="checkbox" />
              <label> Remember me </label>
            </div>
            <div class="submitBx">
              <button
                :disabled="loginLoading || incompleteCredentials"
                :class="{ no_submit: incompleteCredentials }"
                class="login-submit"
                @click.prevent="login"
              >
                <div
                  v-if="loginLoading"
                  class="spinner-border spinner-border-sm mr-2"
                ></div>
                <span>Sign in</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="imgBx">
        <!-- <img src="../../assets/img/img.jpg" alt=""> -->
      </div>
    </section>
  </div>
</template>
<script>
import Axios from "axios";
// import notify from "@/helpers/functions.js";
import { mapGetters } from "vuex";

export default {
  name: "logincom",
  data() {
    return {
      student: {
        student_id: "",
        credential: "",
      },
      passwordType: "password",
      loginLoading: false,
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),

    incompleteCredentials() {
      return this.student.student_id === "" || this.student.credential === ""
        ? true
        : false;
    },
  },
  mounted() {
    this.checkAuthentication(), console.log(this.$route.params.schoolid);
  },
  methods: {
    async login() {
      try {
        this.loginLoading = true;
        let body = this.student;
        // let body = { ...this.student, _id: this.$route.params.schoolid };

        let { data, status } = await Axios.post("school/student-login", body);
        // console.log(data, status);
        if (status == 200) {
          console.log(data);
          this.$store.dispatch("setUserData", data.message.data);
          localStorage.setItem("auth_staff", data.message.token);
          localStorage.setItem("school_id", this.$route.params.schoolid);
          this.$router.push({
            path: "/",
          });
          //   notify.toast("Welcome", "You are logged in", `Welcome`, 5000, "app");
          //   this.checkAuthentication();
        }
      } catch (error) {
        console.log(error);
        console.table(error);
      } finally {
        this.loginLoading = false;
      }
    },
    checkAuthentication() {
      if (this.isLoggedIn) {
        this.$router.push("/");
      }
    },
    returnToPreviousPage() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    togglePassword() {
      if (this.passwordType == "text") {
        this.passwordType = "password";
      } else {
        this.passwordType = "text";
      }
    },
    focusEvent(e) {
      let parent = e.target.parentNode.parentNode;
      parent.classList.add("focus");
    },
    blurEvent(e) {
      let parent = e.target.parentNode.parentNode;
      if (e.target.value == "") {
        parent.classList.remove("focus");
      }
    },
    setPasswordIcon(password) {
      if (password == "text") {
        return "bx-show-alt";
      } else {
        return "bx-hide";
      }
    },
  },
};
</script>

<style>
.no_submit {
  cursor: not-allowed;
}
</style>