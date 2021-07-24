<template>
  <div class="l-navbar" id="nav-bar">
    <nav class="nav">
      <div>
        <a href="#" class="nav__logo">
          <!-- <i class="bx bx-user nav__logo-icon"></i> -->
          <box-icon
            color="white"
            name="layer"
            class="nav__logo-icon"
          ></box-icon>
          <span class="nav__logo-name">Cirportal</span>
        </a>

        <div class="nav__list">
          <router-link to="/" tag="a" class="nav__link">
            <!-- <i class="bx bx-user nav__icon"></i> -->
            <box-icon
              color="white"
              name="tachometer"
              class="nav__icon"
            ></box-icon>
            <span class="nav__name">Dashboard</span>
          </router-link>

          <router-link to="/profile" tag="a" class="nav__link">
            <!-- <i class="fa fa-user nav__icon"></i> -->
            <box-icon
              color="white"
              name="user-plus"
              class="nav__icon"
            ></box-icon>
            <span class="nav__name">Profile</span>
          </router-link>

          <router-link to="/payment" tag="a" class="nav__link">
            <!-- <i class="fa fa-envelope nav__icon"></i> -->
            <box-icon
              color="white"
              name="credit-card"
              class="nav__icon"
            ></box-icon>
            <span class="nav__name">Payment</span>
          </router-link>

          <router-link to="/results" tag="a" class="nav__link">
            <!-- <i class="fa fa-bookmark nav__icon"></i> -->
            <box-icon color="white" name="book" class="nav__icon"></box-icon>
            <span class="nav__name">Results</span>
          </router-link>

          <router-link to="/timetable" tag="a" class="nav__link">
            <!-- <i class="fa fa-folder nav__icon"></i> -->
            <box-icon
              color="white"
              name="book-reader"
              class="nav__icon"
            ></box-icon>
            <span class="nav__name">Timetable</span>
          </router-link>

          <router-link to="/wallet" tag="a" class="nav__link">
            <!-- <i class="fa fa-chart-bar nav__icon"></i> -->
            <box-icon color="white" class="nav__icon" name='wallet'></box-icon>
            <span class="nav__name">Wallet</span>
          </router-link>
        </div>
      </div>

      <span style="cursor:pointer;" class="nav__link cursor-pointer" @click="logout">
        <!-- <i class="fa fa-sign-out-alt nav__icon"></i> -->
        <box-icon color="white" name="log-out" class="nav__icon"></box-icon>
        <span class="nav__name">Logout</span>
      </span>
    </nav>
  </div>
</template>

<script>
export default {
  name: "sidenav",
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push({
        path: `/login`,
      });
    },
  },
};
</script>

<style>
</style>