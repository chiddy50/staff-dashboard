<template>
  <div class="w-full pl-2 mt-12">
    <div class="row px-3 pt-10 flex items-center justify-between">
      <div class="flex items-center">
        <h1 class="text-3xl m-0 flex items-center">
          <i class="bx bx-book mr-2"></i> <span>Class</span>
        </h1>
      </div>
    </div>
    <div class="row pr-3">
      <hr class="w-full" />
    </div>
    <div v-if="loading" class="flex items-center flex-col justify-center py-5">
      <div style="width: 5rem; height: 5rem;" class="spinner-border text-dark"></div>   
    </div>
    <div v-else id="accordion">
      <div class="card" v-for="(class_item, index) in classes" :key="class_item._id">
        <div class="card-header" style="border-bottom:none;">
          <a class="card-link text-gray-500 text-lg" data-toggle="collapse" :href="`#collapseOne_${index}`">
            {{ class_item.desc }}
          </a>
        </div>
        <div :id="`#collapseOne_${index}`" class="collapse show" data-parent="#accordion">
          <div class="card-body">
            <router-link :to="`/subclass-students/${class_item.name}/${class_item.desc}/${subclass.name}`"
             :style="{background: subclass.color}" 
            class="text-capitalize px-5 py-1 mr-2 rounded-xl text-light subclass_btn"
             v-for="subclass in class_item.subclass" :key="subclass._id">
              {{ subclass.name }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
      
  </div>
</template>

<script>

// import { mapState } from "vuex";
import Axios from "axios";
import Helper from "@/helpers/functions.js";

export default {
  name: "classes",
  data() {
    return {
      loading: false,
      getstudent_loading: false,
      classes: [],
      mycolor: '#'+(Math.random()*0xFFFFFF<<0).toString(16)

    };
  },
  computed: {
    // ...mapState(["userData", "dataLoading", "walletBalance"]),
  },
  watch: {
  
  },
  mounted() {
    this.getClass();
  },
  methods: {
    toNaira(value = 0) {
      return formatNaira(value);
    },
    async getClass() {
      try {
        this.loading = true;
        let auth = Helper.auth();
        let { data, status } = await Axios.get("school/staff_class", auth);

        if (status == 200) {
          this.classes = data.data;
          this.classes = this.classes.map(item => {
              item.subclass.forEach(subclass_item => {
                let color = this.generator();
                subclass_item.color = this.darken(color);
              });
              return item;
          })
          console.log(this.classes)
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    generator(){
      let random_color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
      return random_color;
    },

    darken(hex, lum = 0){
      hex = String(hex).replace(/[^0-9a-f]/gi, '');
      if (hex.length < 6) {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
      }
      lum = lum || 0;

      // convert to decimal and change luminosity
      var rgb = "#", c, i;
      for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00"+c).substr(c.length);
      }
      return rgb;
    },
    
  
  },

};
</script>

<style>

.subclass_btn {
  cursor: pointer;
}

.subclass_btn:hover {
  opacity: 0.7;
}
</style>
