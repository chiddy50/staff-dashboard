<template>
  <div class="w-full pl-2 mt-12">
    <div class="row p-3">
      <div class="col-md-6 flex items-center"></div>
    </div>
    <div class="row p-3">
      <div class="col-md-6 flex items-center">
        <h1 class="text-3xl ml-3"><i class="bx bx-message-detail ml-2"></i><b> Profile</b></h1>
      </div>
    </div>
    <div class="row">
      <hr class="w-full" />
    </div>
    <div v-if="loading" class="flex items-center flex-col justify-center p-4">
      <img src="../../assets/img/preloadermain.gif" alt="" />
    </div>
    <div v-else class="row px-4">
      <div v-if="userData !== null" class="col-md-12">
        <div class="row rounded p-4">
          <div class="col-md-12 my-4">
            <div class="flex">
              <div class="profile__banner">
                <div>
                  <div class="row">
                    <div class="col-md-12 flex justify-center">
                      <div class="h-32 w-32 relative">
                        <img
                          src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/artistic-album-cover-design-template-d12ef0296af80b58363dc0deef077ecc_screen.jpg?ts=1561488440"
                          class="rounded-circle shadow-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h1
                    class="text-xl lg:text-2xl xl:text-2xl  mb-3"
                  >
                    {{ userData.first_name }} {{ userData.last_name }}
                    {{ userData.middle_name }}
                  </h1>
                  <p
                    class="text-sm text-red-600 bg-red-100 py-2 px-3 mb-0 rounded text-center"
                  >
                    <b> {{ userData.student_id }}</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="col-md-12 mt-1 mb-2">
            <div class="flex">
              <div class="w-1/2">
                <p class="text-sm text-gray-600">Ranking</p>
                <p>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </p>
              </div>
            </div>
          </div> -->
          <div class="col-md-12 mb-2">
            <div class="flex items-center">
              <span class="text-xs"><i class="fas fa-user"></i></span>
              <hr class="w-full ml-2" />
            </div>
          </div>
          <div class="col-md-12 col-lg-6 mb-3">
            <p class="bg-secondary p-2 text-white rounded text-capitalize">
              <b>Email: </b>&nbsp; {{ userData.email }}
            </p>
          </div>
          <div class="col-md-12 col-lg-6 mb-3">
            <p class="bg-secondary p-2 text-white rounded text-capitalize">
              <b>Mobile:</b>&nbsp; {{ userData.mobile }}
            </p>
          </div>
          <div class="col-md-12 col-lg-6 mb-3">
            <p class="bg-secondary p-2 text-white rounded text-capitalize">
              <b>Date Of Birth: </b> &nbsp; {{ formatDate(userData.date) }}
            </p>
          </div>
          <div class="col-md-12 col-lg-6 mb-3">
            <p class="bg-secondary p-2 text-white rounded text-capitalize">
              <b>Genotype: </b> &nbsp; {{ userData.genotype }}
            </p>
          </div>
          <div class="col-md-12 col-lg-6 mb-3">
            <p class="bg-secondary p-2 text-white rounded text-capitalize">
              <b>Blood Group: </b> &nbsp; {{ userData.blood_group }}
            </p>
          </div>
          <div class="col-md-12 col-lg-6 mb-3">
            <p class="bg-secondary p-2 text-white rounded text-capitalize">
              <b>Gender:</b>&nbsp; {{ userData.gender }}
            </p>
          </div>
          <div class="col-md-12 col-lg-6 mb-3">
            <p class="bg-secondary p-2 text-white rounded text-capitalize">
              <b>Local Gov't:</b> &nbsp; {{ userData.local_govt }}
            </p>
          </div>
          <div class="col-md-12 col-lg-6 mb-3">
            <p class="bg-secondary p-2 text-white rounded text-capitalize">
              <b>State:</b>&nbsp; {{ userData.state }}
            </p>
          </div>
          <div class="col-md-12 mb-6">
            <p class="bg-secondary p-2 text-white rounded text-capitalize">
              <b>Address:</b> &nbsp; {{ userData.address }}
            </p>
          </div>
          <div class="col-md-12 mb-3">
            <div class="flex items-center">
              <span class="text-xs">
                <!-- <i class="fas fa-user">Guardian</i> -->
                <span class="text-xl">Guardian</span>
              </span>
              <hr class="w-full ml-2" />
            </div>
          </div>

          <div
            v-if="
              guardian.first_name == null || guardian.first_name == undefined
            "
            class="col-12 flex items-center justify-center p-4"
          >
            <h2 class="text-muted text-2xl">No Guardian added yet</h2>
          </div>
          <div v-else class="row w-full">
            <div class="col-md-12 col-lg-6 mb-3">
              <p class="bg-secondary p-2 text-white rounded text-capitalize">
                <b>First Name: </b>&nbsp; {{ guardian.first_name }}
              </p>
            </div>
            <div class="col-md-12 col-lg-6 mb-3">
              <p class="bg-secondary p-2 text-white rounded text-capitalize">
                <b>Last Name: </b>&nbsp; {{ guardian.last_name }}
              </p>
            </div>
            <div class="col-md-12 col-lg-6 mb-3">
              <p class="bg-secondary p-2 text-white rounded text-capitalize">
                <b>Middle Name: </b>&nbsp; {{ guardian.middle_name }}
              </p>
            </div>
            <div class="col-md-12 col-lg-6 mb-3">
              <p class="bg-secondary p-2 text-white rounded text-capitalize">
                <b>Mobile: </b>&nbsp; {{ guardian.mobile }}
              </p>
            </div>
            <div class="col-md-12 col-lg-6 mb-3">
              <p class="bg-secondary p-2 text-white rounded text-capitalize">
                <b>Email: </b>&nbsp; {{ guardian.email }}
              </p>
            </div>
            <div class="col-md-12 col-lg-6 mb-3">
              <p class="bg-secondary p-2 text-white rounded text-capitalize">
                <b>Occupation: </b>&nbsp; {{ guardian.occupation }}
              </p>
            </div>
            <div class="col-md-12 col-lg-6 mb-3">
              <p class="bg-secondary p-2 text-white rounded text-capitalize">
                <b>Address: </b>&nbsp; {{ guardian.address }}
              </p>
            </div>
          </div>
          <!----><!---->
        </div>
      </div>
      <div v-else class="flex items-center justify-center p-4">
        <img src="../../assets/img/noitem.png" width="30%" alt="" />
        <!-- <h2 class="text-muted text-xl">No Data</h2> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Axios from "axios";
import viewimage from "@/components/viewimage/viewimage";
import Helper from "@/helpers/functions";

export default {
  name: "profilecom",
  data() {
    return {
      loading: false,
    };
  },
  components: {
    viewimage,
  },
  computed: mapState({
    // arrow functions can make the code very succinct!
    // passing the string value 'count' is same as `state => state.count`
    // to access local state with `this`, a normal function must be used
    userData: (state) => state.userData,
    guardian: (state) => state.userData.guardian,
  }),
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        this.loading = true;
        let auth = Helper.auth();

        let { data, status } = await Axios.get("school/student-details", auth);

        if (status == 200) {
          this.$store.dispatch("setUserData", data.data);
        }
      } catch (error) {
        console.log(error);
        console.table(error);
      } finally {
        this.loading = false;
      }
    },
    formatDate(date) {
      return Helper.formatDate(date);
    },
  },
};
</script>

<style>
.profile__banner {
  width: 50%;
  display: flex;
  align-items: center;
}

.profile__banner > :nth-child(2) {
  margin-top: 10px;
  margin-left: 2rem;
}

@media only screen and (max-width: 60.625em) {
  /** 970px */
  .profile__banner {
    width: 100%;
    flex-direction: column;
  }

  .profile__banner > :nth-child(2) {
    text-align: center;
    margin-top: 10px;
    margin-left: 0px;
  }
}
</style>
