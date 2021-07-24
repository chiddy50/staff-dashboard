<template>
  <div class="w-full pl-2 mt-12">
    <div class="row p-3">
      <div class="col-md-6 flex items-center"></div>
    </div>
    <div class="row p-3">
      <div class="col-md-6 flex items-center">
        <h1 class="text-3xl ml-3">
          <i class="bx bx-message-detail ml-2"></i><b> Timetable</b>
        </h1>
      </div>
    </div>
    <div class="row">
      <hr class="w-full" />
    </div>
    <div class="row p-3">
      <div class="w-full">
        <div class="moveInLeft w-full pl-2">
          <div class="row p-3">
            <div class="w-full">
              <div
                v-for="item in formatedData"
                :key="item.day"
                class="mb-5"
                style="display: flex; gap: 20px"
              >
                <div class="w-100" v-if="item.events.length">
                  <div class="flex flex-col mb-4">
                    <span class="day__text text-capitalize">{{
                      item.day
                    }}</span>
                  </div>
                  <div class="event__box" v-show="item.events.length">
                    <div
                      v-for="(event, index) in item.events"
                      :key="index"
                      style="position: relative"
                      class="p-4 rounded-sm shadow-md bg-white event col-span-1"
                    >
                      <div class="text-capitalize text-center mb-3">
                        <p class="activity p-0">{{ event.subject }}</p>
                        <span class="type">{{ event.type }}</span>
                      </div>
                      <div>
                        <span class="starts rounded-l-sm">{{
                          formatStart(event.duration)
                        }}</span>
                        <span class="ends rounded-r-sm">{{
                          formatEnd(event.duration)
                        }}</span>
                      </div>
                    </div>
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
// import { mapState, mapMutations } from "vuex";
import Axios from "axios";
import Helper from "@/helpers/functions";

export default {
  name: "timetablecom",
  data() {
    return {
      days: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
      formatedData: [],
      event_data: [
        {
          day: "Monday",
          events: [
            {
              subject: "Mathematics",
              duration: "10:30 - 11:30",
              type: "class",
              starts: {
                hour: 10,
                minute: 30,
              },
              ends: {
                hour: 11,
                minute: 30,
              },
            },
            {
              subject: "English",
              duration: "9:00 - 10:30",
              type: "class",
              starts: {
                hour: 9,
                minute: 0,
              },
              ends: {
                hour: 10,
                minute: 30,
              },
            },
            {
              subject: "Break time",
              duration: "12:00 - 1:00",
              type: "break",
              starts: {
                hour: 12,
                minute: 0,
              },
              ends: {
                hour: 1,
                minute: 0,
              },
            },
            {
              subject: "Economics",
              duration: "11:30 - 12:00",
              type: "class",
              starts: {
                hour: 11,
                minute: 30,
              },
              ends: {
                hour: 12,
                minute: 0,
              },
            },
            {
              subject: "Agric Science",
              duration: "1:00 - 2:00",
              type: "class",
              starts: {
                hour: 13,
                minute: 0,
              },
              ends: {
                hour: 14,
                minute: 0,
              },
            },
            {
              subject: "Biology",
              duration: "2:00 - 3:00",
              type: "class",
              starts: {
                hour: 14,
                minute: 0,
              },
              ends: {
                hour: 15,
                minute: 0,
              },
            },
            {
              subject: "Literature",
              duration: "3:00 - 4:00",
              type: "class",
              starts: {
                hour: 15,
                minute: 0,
              },
              ends: {
                hour: 16,
                minute: 0,
              },
            },
          ],
        },
        {
          day: "Tuesday",
          events: [
            {
              subject: "Mathematics",
              duration: "12:00 - 1:00",
              type: "class",
              starts: {
                hour: 12,
                minute: 0,
              },
              ends: {
                hour: 1,
                minute: 0,
              },
            },
            {
              subject: "English",
              duration: "9:00 - 11:00",
              type: "class",
              starts: {
                hour: 9,
                minute: 0,
              },
              ends: {
                hour: 11,
                minute: 0,
              },
            },
            {
              subject: "Break time",
              duration: "12:00 - 1:00",
              type: "break",
              starts: {
                hour: 12,
                minute: 0,
              },
              ends: {
                hour: 1,
                minute: 0,
              },
            },
            {
              subject: "Economics",
              duration: "11:00 - 12:00",
              type: "class",
              starts: {
                hour: 11,
                minute: 0,
              },
              ends: {
                hour: 12,
                minute: 0,
              },
            },
            {
              subject: "Home mgt",
              duration: "1:00 - 2:00",
              type: "class",
              starts: {
                hour: 13,
                minute: 0,
              },
              ends: {
                hour: 14,
                minute: 0,
              },
            },
            {
              subject: "Chemistry",
              duration: "2:00 - 3:00",
              type: "class",
              starts: {
                hour: 14,
                minute: 0,
              },
              ends: {
                hour: 15,
                minute: 0,
              },
            },
            {
              subject: "Futher Math",
              duration: "3:00 - 4:00",
              type: "class",
              starts: {
                hour: 15,
                minute: 0,
              },
              ends: {
                hour: 16,
                minute: 0,
              },
            },
          ],
        },
      ],
      loading: false,
    };
  },

  components: {},
  computed: {},
  methods: {
    formatData() {
      let formatEvent = this.event_data.map((data) => {
        data.events.forEach((event) => {
          let startHr = event.starts.hour;
          let startMin =
            event.starts.minute < 10
              ? "0" + event.starts.minute
              : event.starts.minute;

          let startDate = this.formatDate(startHr, startMin, 0);
          event.starts.timestamp = startDate.getTime();
        });
        return data;
      });

      this.formatedData = formatEvent.map((data) => {
        let newEvents = [];
        data.events.forEach((item) => newEvents.push(item));

        // Sorting the events and reassigning the events property
        newEvents.sort(
          (event1, event2) => event1.starts.timestamp - event2.starts.timestamp
        );
        data.events = newEvents;
        return data;
      });
      console.log(this.formatedData);
    },
    formatDate(hrs, min, sec) {
      let date = new Date();
      date.setHours(hrs);
      date.setMinutes(min);
      date.setSeconds(sec);
      return date;
    },
    formatStart(duration) {
      return duration.split("-")[0].trim();
    },
    formatEnd(duration) {
      return duration.split("-")[1].trim();
    },
    async getData() {
      try {
        this.loading = true;
        let auth = Helper.auth();

        let { data, status } = await Axios.get("school/student-timetable", auth);

        if (status == 200) {
          // this.$store.dispatch("setUserData", data.data);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
        console.table(error);
      } finally {
        this.loading = false;
      }
    },
  },

  mounted() {
    this.formatData();
    this.getData();
  },
};
</script>

<style>
.event__box {
  display: grid;
  gap: 1.2rem;
  grid-template-columns: repeat(4, 1fr);
}

.event {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: #fff;
}

.activity {
  font-size: 17px;
  font-weight: 500;
  margin: 0;
  color: #333;
}
.day__text {
  color: #444;
  font-size: 25px;
}
.type {
  font-size: 13px;
  color: rgb(150, 150, 150);
  font-weight: 600;
}

.starts,
.ends {
  font-size: 16px;
  background-image: linear-gradient(to right bottom, #707376, #353536);
  padding: 8px 17px;
  color: #fff;
}

@media only screen and (max-width: 43.75em) {
  /** 700px */
  .event__box {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media only screen and (min-width: 56.25em) {
  /** 900px */
  /* .event__box {
    grid-template-columns: repeat(2, 1fr);
  }  */
}
</style>
