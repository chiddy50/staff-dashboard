<template>
  <div id="parent_wrapper">
    <!-- <mainheader :togglemenu="togglemenu" /> -->
    <!-- <sidenav /> -->

    <header class="header" id="main_header">
      <div class="header__container">
        <div class="flex items-center" v-if="current_staff">
          <b-avatar
            :src="
              `${current_staff.image.file_url}` ||
              'https://guardian.ng/wp-content/uploads/2018/07/unnamed-2-4.jpg'
            "
            class="mr-3"
          ></b-avatar>
          <a href="#" class="header__logo">
            {{ current_staff.first_name }} {{ current_staff.last_name }}</a
          >
        </div>

        <div class="header__toggle ml-3">
          <i class="bx bx-menu" id="header-toggle"></i>
        </div>
      </div>
    </header>

    <div class="navigation" id="navbar">
      <nav class="nav__container">
        <div>
          <a href="#" class="nav__link nav__logo">
            <!-- <i class="bx bxs-disc nav__icon"></i> -->
            <img src="../assets/img/logo.png" alt="" class="w-32" srcset="" />
            <!-- <span class="nav__logo-name">Cirportal</span> -->
          </a>

          <div class="nav__list">
            <div class="nav__items">
              <!-- <h3 class="nav__subtitle">Partner</h3> -->

              <router-link to="/" tag="a" class="nav__link">
                <i class="bx bx-home nav__icon"></i>
                <span class="nav__name">Dashboard</span>
              </router-link>

              <router-link to="/profile" tag="a" class="nav__link">
                <i class="bx bx-user nav__icon"></i>
                <span class="nav__name">Profile</span>
              </router-link>

              <router-link to="/class" tag="a" class="nav__link">
                <i class="bx bx-book nav__icon"></i>
                <span class="nav__name">Class</span>
              </router-link>

              <div class="nav__dropdown">
                <a href="#" class="nav__link">
                  <i class="bx bx-notepad nav__icon"></i>
                  <span class="nav__name">Assesment</span>
                  <i
                    class="bx bx-chevron-down nav__icon nav__dropdown-icon"
                  ></i>
                </a>

                <div class="nav__dropdown-collapse">
                  <div class="nav__dropdown-content">
                    <router-link
                      to="/assignment"
                      tag="a"
                      class="nav__dropdown-item"
                      >Assignment</router-link
                    >
                    <router-link
                      to="/classwork"
                      tag="a"
                      class="nav__dropdown-item"
                      >Classwork</router-link
                    >
                    <router-link
                      to="/exam"
                      tag="a"
                      class="nav__dropdown-item"
                      >Exam</router-link
                    >
                  </div>
                </div>
              </div>

              <router-link to="/timetable" tag="a" class="nav__link">
                <i class="bx bx-book-reader nav__icon"></i>
                <span class="nav__name">Timetable</span>
              </router-link>

              <router-link to="/communication" tag="a" class="nav__link">
                <i class="bx bx-message-square nav__icon"></i>
                <span class="nav__name">Message</span>
              </router-link>

              <router-link to="/wallet" tag="a" class="nav__link">
                <i class="bx bx-wallet nav__icon"></i>
                <span class="nav__name">Leave</span>
              </router-link>

              <router-link to="/settings" tag="a" class="nav__link">
                <i class="bx bx-cog nav__icon"></i>
                <span class="nav__name">Salary</span>
              </router-link>
            </div>
          </div>
        </div>

        <span @click="logout" class="nav__link nav__logout">
          <i class="bx bx-log-out nav__icon"></i>
          <span class="nav__name">Sign out</span>
        </span>
      </nav>
    </div>

    <main>
      <section id="content" class="margin-content">
        <component :is="component"></component>
      </section>
    </main>

    <!-- <div id="content" class="margin-content">
      <component :is="component"></component>
    </div> -->
  </div>
</template>
<script>
import mainheader from "../components/header/header";
import sidenav from "../components/sidenav/sidenav";
import Helper from "@/helpers/functions";
import { mapState } from "vuex";

export default {
  props: ["component"],
  name: "show",
  data() {
    return {
      togglemenu: false,
      isLoggedIn: "",
    };
  },
  components: {
    mainheader,
    sidenav,
  },
  computed: {
    ...mapState({
      current_staff: (state) => state.userData,
    }),
  },
  methods: {
    // showNavabr(toggleId, navId, bodyId, headerId) {
    //   const toggle = document.getElementById(toggleId);
    //   const nav = document.getElementById(navId);
    //   const bodypd = document.getElementById(bodyId);
    //   const headerpd = document.getElementById(headerId);
    //   bodypd.classList.remove("body-pd");
    //   // Validate that all variables exist
    //   if (toggle && nav && bodypd && headerpd) {
    //     toggle.addEventListener("click", () => {
    //       // show navabr
    //       nav.classList.toggle("show");

    //       //  change icon
    //       toggle.classList.toggle("bx-x");
    //       if (toggle.classList.contains("bx-x")) {
    //         this.togglemenu = true;
    //       } else {
    //         this.togglemenu = false;
    //       }

    //       // add padding to body
    //       if (nav.classList.contains("show")) {
    //         bodypd.classList.add("body-pd");
    //       } else {
    //         bodypd.classList.remove("body-pd");
    //       }

    //       // add padding to header
    //       headerpd.classList.toggle("body-pd");
    //     });
    //   }

    //   /*============ LINK ACTIVE ============= */
    //   const linkColor = document.querySelectorAll(".nav__link");

    //   function colorLink() {
    //     if (linkColor) {
    //       linkColor.forEach((l) => l.classList.remove("active"));
    //       this.classList.add("active");
    //     }
    //   }

    //   linkColor.forEach((l) => l.addEventListener("click", colorLink));
    // },
    showMenu(headerToggle, navbarId) {
      const toggleBtn = document.getElementById(headerToggle),
        nav = document.getElementById(navbarId);

      // Validate that variables exist
      if (headerToggle && navbarId) {
        toggleBtn.addEventListener("click", () => {
          // We add the show-menu class to the div tag with the nav__menu class
          nav.classList.toggle("show-menu");
          // change icon
          toggleBtn.classList.toggle("bx-x");
        });
      }
    },

    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push({
        path: `/login`,
      });
    },
    async getUser() {
      try {
        let auth = Helper.auth();
        let { data, status } = await this.$axios.get(
          "school/staff-details",
          auth
        );
        if (status == 200) {
          this.$store.dispatch("setUserData", data.data);
        }
      } catch (error) {
        console.log(error);
      }
    },

    // overNav(){
    //   let headerElem = document.querySelector('.header__container');
    //   headerElem.classList.add('hover_margin')
    //   console.log(headerElem);
    // },
    // outNav(){
    //   let headerElem = document.querySelector('.header__container');
    //   headerElem.classList.remove('hover_margin')
    // }
  },
  async mounted() {
    // this.showNavabr("header-toggle", "nav-bar", "body-pd", "main_header");
    this.showMenu("header-toggle", "navbar");
  },
  beforeMount() {
    this.getUser();
  },
};
</script>

<style>
.nav__link.router-link-exact-active.router-link-active {
  color: white;
}
</style>
