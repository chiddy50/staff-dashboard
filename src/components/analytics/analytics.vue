<template>
  <div class="mt-12 pt-5">
    <div class="custom__banner mb-3 rounded-md flex justify-between">
      <div class="flex items-center justify-between banner__header w-full">
        <h1 class="text-3xl mb-0 text-muted">
          <i class="bx bx-message-detail ml-2"></i>
          Hello, <span class="text-dark font-bold">Mike!</span>
        </h1>
        <h1 class="text-lg font-bold">September 28, monday</h1>
        <!-- <box-icon class="text-gray-500" size="md" name="tachometer"></box-icon> -->
        <!-- <i class='bx bxs-bong bx-sm darker'></i> -->
        <!-- <h1 class="custom__banner--title mb-0 ml-2 text-gray-500">Dashboard</h1> -->
      </div>
    </div>

    <div class="dashboard__content my-4">
      <div class="col-12">
        <!-- <div v-for="(data, index) in nextSevenDays" :key="index" class="wrap-collabsible mb-2">
            <input :id="'collapsible_'+index" class="toggle" type="checkbox">
            <label :for="'collapsible_'+index" class="lbl-toggle">{{ data.day }}</label>
            <div class="collapsible-content">
              <div class="content-inner">
                  <div class="grid grid-cols-4 mb-3">
                    <div style="background: #b96d40" class="flex items-center justify-center px-2 py-1 text-light bg-red-600 text-xs font-bold col-span-1 mr-1 rounded">
                      <span>9:00am - 10:00am</span>  
                    </div>                
                    <div class="flex flex-col text-light bg-red-600 text-xs font-bold col-span-1 mr-1 rounded">
                      <span style="background: #ca054d ce3b70" class="p-2 text-center">Class</span>
                      <span style="background: #ce3b70" class="p-2 text-center">Mathematics</span>
                    </div>
                    <div class="flex flex-col text-light bg-red-600 text-xs font-bold col-span-1 mr-1 rounded">
                      <span style="background: #48233C" class="p-2 text-center">Teacher</span>
                      <span style="background: #A882DD" class="p-2 text-center">James Ikechi</span>
                    </div>
                    <div style="background: #5b8c5a" class="flex items-center justify-center px-2 py-1 text-light bg-red-600 text-xs font-bold col-span-1 rounded">Status: Absent</div>    
                  </div>
                  <div class="grid grid-cols-4 mb-3">
                    <div style="background: #b96d40" class="flex items-center justify-center px-2 py-1 text-light bg-red-600 text-xs font-bold col-span-1 mr-1 rounded">
                      <span>9:00am - 10:00am</span>  
                    </div>                
                    <div class="flex flex-col text-light bg-red-600 text-xs font-bold col-span-1 mr-1 rounded">
                      <span style="background: #ca054d ce3b70" class="p-2 text-center">Test</span>
                      <span style="background: #ce3b70" class="p-2 text-center">Economics</span>
                    </div>
                    <div class="flex flex-col text-light bg-red-600 text-xs font-bold col-span-1 mr-1 rounded">
                      <span style="background: #48233C" class="p-2 text-center">Teacher</span>
                      <span style="background: #A882DD" class="p-2 text-center">James Ikechi</span>
                    </div>
                    <div style="background: #E3655B" class="flex items-center justify-center px-2 py-1 text-light bg-red-600 text-xs font-bold col-span-1 rounded">Status: Absent</div>    
                  </div>
                  

              </div>
            </div>
          </div> -->

        <!-- <div class="flex mb-4"></div> -->

        <!-- <div class="activity__list">
          <div
            class="activity__item mb-3"
            v-for="activity in todayActivities"
            :key="activity.id"
          >
            <div class="font-bold mr-4">
              <span class="text-gray-400 duration">{{ activity.starts }}</span>
            </div>
            <div
              class="flex items-center activity shadow-md"
              :class="[activity.class]"
            >
              <div class="activity__icon">
                <i class="bx bx-sm" :class="activity.icon"></i>
              </div>
              <div
                class="flex justify-between items-center activity__text w-full"
              >
                <span class="font-bold darker ml-3">{{
                  activity.subject
                }}</span>
                <span class="font-bold text-light activity__type bg__darker">{{
                  activity.type
                }}</span>
              </div>
            </div>
          </div>
        </div> -->

        <div class="flex justify-end items-center">
          <div class="w-1/5">
            <select
              @change="changeChart"
              v-model="chart"
              class="custom-select custom-select-sm"
            >
              <option v-for="item in options" :key="item" :value="item">
                {{ item }}
              </option>
              <option :value="this.chart" disabled hidden>Choose Chart</option>
            </select>
          </div>
        </div>

        <div class="row my-10 bg-white shadow-md">
          <div class="col-12">
            <div class="rounded p-3 pt-4">
              <pie-chart v-if="chartType == 'Pie'"></pie-chart>
              <test-scores
                v-else
                :chartType="chartType.toLocaleLowerCase()"
              ></test-scores>
            </div>

            <!-- <div class="col-6"></div> -->
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <!-- progress -->
            <div class="row my-3">
              <div class="w-full bg-white shadow-md rounded p-3">
                <h1 class="sm:text-xs md:text-xl mb-2">Progress</h1>
                <!-- <p class="my-3">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim
                  consectetur perspiciatis, corrupti amet eligendi
                  exercitationem vero voluptatibus quas harum ipsum excepturi
                  cum dolorum numquam adipisci quo! Est doloremque ab velit?
                </p> -->
                <div class="progress" style="height: 9px">
                  <div
                    class="progress-bar bg-gg"
                    role="progressbar"
                    style="width: 25%"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
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

export default {
  name: "dashboard",
  data() {
    return {
      firstDayOfWeek: null,
      nextSevenDays: [],
      todayActivities: [
        {
          id: 1,
          type: "Class",
          subject: "Chemistry",
          icon: "bx-bong",
          starts: "09:00",
          class: "bg-yellow-50",
        },
        {
          id: 2,
          type: "Class",
          subject: "Biology",
          icon: "bx-dna",
          starts: "10:00",
          class: "bg-purple-50",
        },
        {
          id: 13,
          type: "Test",
          subject: "Physics",
          icon: "bx-atom",
          starts: "11:00",
          class: "bg-red-50",
        },
      ],
      chartType: "Column",
      chart: "",
      options: ["Pie", "Column", "Line"],
    };
  },
  components: {
    TestScores,
    PieChart,
  },
  mounted() {
    this.weekFormat();
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
  },
};
</script>

<style>
.custom__banner {
  display: flex;
  align-items: center;
  padding: 20px 20px 0;
  /* border: 1px solid #f8fbff; */
}

.custom__banner--title {
  font-size: 26px;
  margin-left: 8px;
}

.activity {
  display: flex;
  border-radius: 8px;
  padding: 16px;
  width: -webkit-fill-available;
}

.activity__icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #bdcaf1;
}

.activity__item {
  display: flex;
  align-items: center;
}

/* .activity__item > :nth-child(1){
  flex: 1;
}
.activity__item > :nth-child(2) {
  flex: 17;
} */

.activity__type {
  margin-left: 10px;
  padding: 3px 13px;
  border-radius: 6px;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
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

.chart_btn_box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 9px;
  margin-bottom: 20px;
}

.chart_btn_box > :nth-child(1) {
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
}

.chart_btn_box > :nth-child(3) {
  border-top-right-radius: 14px;
  border-bottom-right-radius: 14px;
}

.chart_btn {
  border: none;
  background: teal;
  color: #fff;
  padding: 4px 10px;
  font-size: 14px;
}

.color-1 {
  background: #f4989c;
}
.color-2 {
  background: #c69dd2;
}
.color-3 {
  background: #ead94c;
}
.color-4 {
  background: #7f7eff;
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
  .activity__text {
    align-items: end;
    flex-direction: column;
  }

  .activity__text > * {
    margin-left: 15px;
  }

  .activity__icon {
    background: transparent;
  }
}
</style>