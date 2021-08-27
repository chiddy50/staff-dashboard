<template>
  <div class="mt-12 pt-5">
    <div class="custom__banner rounded-md flex justify-between">
      <div class="flex items-center justify-between banner__header w-full">
        <h1 class="text-3xl mb-0 text-muted" v-if="current_staff">
          <i class="bx bx-message-detail ml-2"></i>
          Hello,
          <span class="text-dark font-bold"
            >{{ current_staff.first_name }}!</span
          >
        </h1>
        <h1 class="text-lg font-bold">{{ Date.now() | dateFilter }}</h1>
      </div>
    </div>

    <div class="dashboard__content my-5">
      <div class="col-12">
        <div class="row">
          <div class="col-12 col-lg-6 col-xl-5 p-4 bg-white">
            <!-- <div class="flex justify-end items-center">
              <div class="w-1/4">
                <select
                  @change="changeChart"
                  v-model="chart"
                  class="custom-select custom-select-sm"
                >
                  <option v-for="item in options" :key="item" :value="item">
                    {{ item }}
                  </option>
                  <option :value="this.chart" disabled hidden>
                    Choose Chart
                  </option>
                </select>
              </div>
            </div>

            <div class="mt-4 bg-white shadow-md">
              <div class="rounded py-3 px-4">
                <pie-chart v-if="chartType == 'Pie'"></pie-chart>
                <test-scores
                  v-else
                  :chartType="chartType.toLocaleLowerCase()"
                ></test-scores>
              </div>
            </div> -->
            <calender @get-activties="analytics()"></calender>
          </div>
          <div :class="analyticsloading ? 'flex items-center justify-center' : ''" class="col-12 col-lg-6 col-xl-7">            
            <div v-if="analyticsloading" style="width: 6rem; height: 6rem;" 
            class="spinner-border text-dark"></div>            
            <div v-else>
              <h1 v-if="todayActivities.length > 0" class="text-lg text-gray-400 m-0 text-center">
                Here is your schedule for today,
              </h1>
              <h1 v-else class="text-lg text-gray-400 m-0 text-center">
                No Activities
              </h1>
              <div class="mb-10 mt-3">
                <div class="mb-4">
                  <div
                    class="schedule_item rounded-md shadow-sm p-3"
                    :key="index"
                    v-for="(item,index) in todayActivities"
                  >
                    <p class="text-sm font-bold m-0 text-uppercase m-">
                      {{item.activity}} Class <span class="font-light">for {{item.class}} {{item.subclass}}</span>
                    </p>
                    <span class="text-xs text-gray-400">{{ formatTime(item.starts) }} - {{ formatTime(item.ends) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import TestScores from "@/components/chart/test_score/TestScore.vue";
import PieChart from "@/components/chart/test_score/PieChart.vue";
import Helper from "@/helpers/functions";
import { mapState } from "vuex";
import Calender from './Calender';

export default {
  name: "dashboard",
  data() {
    return {
      firstDayOfWeek: null,
      nextSevenDays: [],
      todayActivities: [],
      chartType: "Column",
      chart: "",
      options: ["Pie", "Column", "Line"],
      analyticsloading: false,
    };
  },
  components: {
    TestScores,
    PieChart,
    Calender
  },
  beforeMount() {
    this.weekFormat();
    this.analytics();
  },
  methods: {
    weekFormat() {
      const getMonday = (d) => {
        let date = new Date(d);
        let day = date.getDay(); // day of the week
        console.log(day);
        // Sunday is zero for getDate() and 6 for Saturday
        let diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        return new Date(date.setDate(diff));
      };

      this.firstDayOfWeek = getMonday(new Date());

      let newStamp = this.firstDayOfWeek.getTime();

      for (let i = 0; i < 5; i++) {
        let mainDate = new Date(newStamp);

        // console.log(mainDate);
        this.nextSevenDays.push({
          day: moment(mainDate).format("MMM Do YYYY"),
          event: "Shool Activity",
          // date: mainDate.getDate(),
          // month: mainDate.getMonth(),
          // year: mainDate.getFullYear(),
        });

        newStamp += 60 * 60 * 24 * 1000;
      }

      console.log(this.nextSevenDays);
    },
    changeChart() {
      console.log(this.chart);
      this.chartType = this.chart;
    },
    async analytics() {
      try {
        let auth = Helper.auth();
        this.analyticsloading = true;
        let { data, status } = await this.$axios.get(
          "school/staff_analytics",
          auth
        );

        if (status == 200) {
          this.todayActivities = data.data;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.analyticsloading = false;
      }
    },
    formatTime(time) {
      let minute = time.min < 10 ? `0${time.min}` : time.min;
      return `${time.hour}:${minute}`;
    },
  },
  computed: {
    ...mapState({
      current_staff: (state) => state.userData,
    }),
  },
};
</script>

<style>
.custom__banner {
  display: flex;
  align-items: center;
  padding: 20px 20px 0;
}

.bg__darker {
  background: #445a9e !important;
}

.darker {
  color: #445a9e;
}

.darker::before {
  color: #445a9e;
}

.dark {
  background: #919cbd;
}

.lighter {
  background: #eaeefc;
}

.duration {
  /* border: 1px solid; */
  height: 52px;
  width: 52px;
  display: flex;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  color: #445a9e;
  font-size: 13px;
}

.schedule_item {
  margin: 0 0 1rem 0;
}

.schedule_item:nth-child(even) {
  border-left: 5px solid #6f42c1;
  background: #6e42c125;
}

.schedule_item:nth-child(odd) {
  border-left: 5px solid orange;
  background: rgba(255, 166, 0, 0.185);
}

@media only screen and (max-width: 69.375em) {
  /**1110px */
  /* .banner__header {
    display: none;
  } */

  .custom__banner {
    justify-content: center;
  }
}

@media only screen and (max-width: 39.375em) {
  /**630px */
}
</style>