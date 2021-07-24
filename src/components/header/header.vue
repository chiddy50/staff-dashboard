<template>
  <div class="main_header bg-white shadow-md" id="main_header">
    <div class="header_toggle">
      <i
        class="bx bx-lg text-3xl"
        :class="togglemenu ? 'bx-x' : 'bx-menu'"
        id="header-toggle"
      ></i>
      <!-- <box-icon
        color="black"
        :name="togglemenu ? 'x' : 'menu'"
        id="header-toggle"
      ></box-icon> -->
    </div>
    <div class="hint__icon mr-5" id="hintOne"></div>
    <div class="header__img">
      <img src="../../assets/img/user-3.jpg" alt="" />
    </div>
  </div>
</template>

<script>
import introJs from "intro.js";
import "intro.js/introjs.css";

export default {
  name: "header",
  props: ["togglemenu"],
  mounted() {
    this.startHints();
    let x = document.querySelector("[data-step='0']");
    console.log(x);
  },
  methods: {
    startHints() {
      const intro = introJs();

      intro.setOptions({
        hints: [
          {
            element: document.querySelector("#hintOne"),
            hint: `<div>
              <div class='toolitp-head' style='display:block;'>
              <span style='font-size:16px;color:#000;float:left;display:inline-block;font-weight: 700;'>Change Password</span>
              <span style='float:right;color:#000;cursor:pointer;font-size: 17px;'>&times;</span>
              </div>
              <span class='tooltip-body'>
              <p style='font-size: 13px; color:#000; display:inline-block;'>You can now change your password.</p>
              </span>
              </div>`,
            hintPosition: "middle-middle",
          },
        ],
      });

      intro.onhintclick((hintElement, item, stepId) => {});

      intro.onhintsadded(() => {});

      intro.onhintclose((stepId) => {});

      intro.addHints();
      intro.showHints();
    },
  },
};
</script>

<style>
a[data-step="0"] .introjs-hint-pulse {
  background-color: #640fb382;
}

a[data-step="0"] .introjs-hint-dot {
  border: 10px solid #640fb3;
}
</style>