<template>
  <div class="w-full pl-2 mt-12">
    <!-- <div class="row p-3">
            <div class="col-md-6 flex items-center"></div>
        </div> -->
    <div class="row px-3 pt-10 flex items-center justify-between">
      <div class="flex items-center">
        <!-- <i class="fas fa-file-invoice text-3xl mr-2"></i> -->
        <h1 class="text-3xl m-0 flex items-center">
          <i class="bx bx-file ml-2"></i> Payment <b> History</b>
        </h1>
      </div>
      <b-btn
        variant="success"
        v-show="!paymentdata.paid"
        v-b-modal.makePayment
        class="shadow-md"
      >
        <!-- Make Payment -->
        <i class="bx bx-plus"></i>
      </b-btn>
    </div>
    <div class="row pr-3">
      <hr class="w-full" />
    </div>
    <preloader v-if="refundLoading"></preloader>
    <div v-else>
      <b-row class="px-2">
        <div class="col-12 my-3">
          <!-- <div class="flex items-center w-full">
              <h1 class="p-3 bg-white shadow-md rounded-md text-sm mb-0 mr-3">Wallet Balance - <span class="text-3xl" :class="styleBalance(walletBalance)">{{toNaira(walletBalance)}}</span></h1>
              <h1 class="p-3 bg-white shadow-md rounded-md text-sm mb-0 mr-3">Outstanding Payment - <span class="text-3xl" :class="styleBalance(walletBalance)">{{toNaira(walletBalance)}}</span></h1>
              <h1 class="p-3 bg-white shadow-md rounded-md text-sm mb-0 mr-3">Paid - <span class="text-3xl" :class="styleBalance(walletBalance)">{{toNaira(walletBalance)}}</span></h1>
          </div> -->
          <div class="data_list">
            <div class="data_item p-5 bg-white">
              <span
                class="text-3xl"
                :class="styleBalance(paymentdata.wallet)"
                >{{ toNaira(paymentdata.wallet) }}</span
              >
              <span class="text-sm font-semibold">Wallet Balance </span>
            </div>
            <!-- <div class="data_item p-5 bg-white">
              <span class="text-3xl" :class="styleBalance(walletBalance)">{{
                toNaira(walletBalance)
              }}</span>
              <span class="text-sm font-semibold">Outstanding Payment </span>
            </div>
            <div class="data_item p-5 bg-white">
              <span class="text-3xl" :class="styleBalance(walletBalance)">{{
                toNaira(walletBalance)
              }}</span>
              <span class="text-sm font-semibold">Paid </span>
            </div> -->
          </div>
        </div>

        <!-- <b-col cols="6">
          <div class="h-full flex items-center">
            <i class="bx bx-search mr-2"></i>
            <input
              type="text"
              class="form-control"
              placeholder="Enter Payment ID"
              v-model="paymentID"
            />
            
          </div>
        </b-col> -->
        <!-- <b-col cols="6">
          <div class="h-full flex items-center">
            <i @click="showFilter = !showFilter" class="bx bx-filter-alt mx-3 cursor-pointer"></i>
            <div class="dropdown" v-if="showFilter">
              <button
                style="font-size: 13px"
                type="button"
                class="btn btn-secondary dropdown-toggle"
                data-toggle="dropdown"
              >
                Filter
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Session</a>
                <a class="dropdown-item" href="#">Term</a>
                <a class="dropdown-item" href="#">Payment Type</a>
              </div>
            </div>
            </div>
        </b-col> -->
      </b-row>

      <div class="py-3">
        <div class="">
          <!-- <div 
            class="bg-white px-4 py-3 rounded-xl flex mb-1 justify-between items-center shadow-md" 
            :key="index"
            v-for="(i, index) in 3"
          >
            <div class="flex mb-1">
              <span class="wallet__type mr-2 bg-green-300 text-green-500 rounded"
                >P.T.A Levy</span
              >
              <span class="tracking-wide font-bold">$40000</span>
            </div>
            <div>
              <span class="text-gray-300 tracking-wide">ID-23544322</span>
            </div>
            <div class="flex">
              <span class="tracking-wide text-gray-300 mr-3">21 Oct 2021</span>
            </div>
          </div> -->
          <!-- <div>{{ paymentdata }}</div> -->
          <div v-if="paymentdata.history.length">
            <b-col :key="index" v-for="(i, index) in paymentdata.history">
              <b-row>
                <b-col>
                  <div class="display-data bg-white">
                    <b-row class="px-2">
                      <b-col>
                        <span class="text-uppercase"
                          >{{ i.session }} - {{ i.term }}</span
                        >
                        <br /><span class="text-gray-500">
                          {{ toNaira(i.total) }}</span
                        >
                      </b-col>
                      <b-col
                        cols="4"
                        class="flex items-center justify-end d-none d-md-flex"
                      >
                        <span class="tracking-wide text-gray-300 mr-3"
                          >232-43424-3224</span
                        >
                        <span class="tracking-wide font-bold"
                          >21 Oct 2021
                        </span>
                      </b-col>
                    </b-row>
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </div>
          <div v-else>
            <h2 class="text-2xl text-center">No payment history</h2>
          </div>
        </div>

        <b-modal
          id="makePayment"
          content-class="bg-gray-100"
          size="lg"
          centered
          hide-footer
          title="Make Payment"
        >
          <div class="row">
            <div class="col-12">
              <b-col
                :key="index"
                v-for="(requirement, index) in paymentdata.requirements"
              >
                <b-row>
                  <b-col>
                    <div class="display-data bg-white shadow-sm">
                      <b-row class="px-2">
                        <b-col class="flex items-center justify-between">
                          <span class="text-capitalize font-bold text-sm">{{
                            requirement.description
                          }}</span>
                          <span class="text-gray-500 text-xs">
                            {{ toNaira(requirement.amount) }}</span
                          >
                        </b-col>
                        <!-- <b-col
                          cols="4"
                          class="flex items-center justify-end d-none d-md-flex"
                        >
                          <span class="tracking-wide text-gray-300 mr-3"
                            >232-43424-3224</span
                          >
                          <span class="tracking-wide font-bold">21 Oct 2021 </span>
                        </b-col> -->
                      </b-row>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <hr />
              <b-col class="mt-3">
                <b-row>
                  <b-col>
                    <div class="bg-white">
                      <b-row class="px-2">
                        <b-col class="flex items-center justify-between">
                          <span class="text-capitalize font-bold text-xl"
                            >TOTAL</span
                          >
                          <span class="text-gray-500 text-xl">
                            {{ toNaira(paymentTotal) }}</span
                          >
                        </b-col>
                      </b-row>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              <hr />

              <div class="col my-4">
                <button
                  class="btn btn-secondary btn-block"
                  @click.prevent="makePayment(paymentdata.requirements)"
                >
                  Pay
                </button>
              </div>
            </div>
          </div>
        </b-modal>

        <!-- <div class="col-lg-6 col-12">
                  <div class="payment__box p-3 w-full ">
                      <div class="payment__form">
                          <div class="form__logo">
                              <img src="../../assets/img/pay.svg" alt="Payment">
                          </div>
                          <div class="form__title">Quick Pay</div>
                          <div class="fields">
                              <div class="payment__type">  
                                  <svg class="svg-icon" viewBox="0 0 20 20">
                                      <path d="M17.728,4.419H2.273c-0.236,0-0.429,0.193-0.429,0.429v10.304c0,0.234,0.193,0.428,0.429,0.428h15.455c0.235,0,0.429-0.193,0.429-0.428V4.849C18.156,4.613,17.963,4.419,17.728,4.419 M17.298,14.721H2.702V9.57h14.596V14.721zM17.298,8.712H2.702V7.424h14.596V8.712z M17.298,6.566H2.702V5.278h14.596V6.566z M9.142,13.005c0,0.235-0.193,0.43-0.43,0.43H4.419c-0.236,0-0.429-0.194-0.429-0.43c0-0.236,0.193-0.429,0.429-0.429h4.292C8.948,12.576,9.142,12.769,9.142,13.005"></path>
                                  </svg>             
                                  <div class="payment-input w-full">
                                      <select style="width: 96%">
                                          <option value="">Choose Type</option>
                                      </select>
                                  </div>            
                              </div>
                              <div class="amount">
                                  <svg class="svg-icon" viewBox="0 0 20 20">
                                      <path d="M17.728,4.419H2.273c-0.236,0-0.429,0.193-0.429,0.429v10.304c0,0.234,0.193,0.428,0.429,0.428h15.455c0.235,0,0.429-0.193,0.429-0.428V4.849C18.156,4.613,17.963,4.419,17.728,4.419 M17.298,14.721H2.702V9.57h14.596V14.721zM17.298,8.712H2.702V7.424h14.596V8.712z M17.298,6.566H2.702V5.278h14.596V6.566z M9.142,13.005c0,0.235-0.193,0.43-0.43,0.43H4.419c-0.236,0-0.429-0.194-0.429-0.43c0-0.236,0.193-0.429,0.429-0.429h4.292C8.948,12.576,9.142,12.769,9.142,13.005"></path>
                                  </svg>
                                  <input type="number" class="amount-input" placeholder="Enter Amount..."/>
                              </div>
                              <div class="amount">
                                  <svg class="svg-icon" viewBox="0 0 20 20">
                                      <path d="M16.557,4.467h-1.64v-0.82c0-0.225-0.183-0.41-0.409-0.41c-0.226,0-0.41,0.185-0.41,0.41v0.82H5.901v-0.82c0-0.225-0.185-0.41-0.41-0.41c-0.226,0-0.41,0.185-0.41,0.41v0.82H3.442c-0.904,0-1.64,0.735-1.64,1.639v9.017c0,0.904,0.736,1.64,1.64,1.64h13.114c0.904,0,1.64-0.735,1.64-1.64V6.106C18.196,5.203,17.461,4.467,16.557,4.467 M17.377,15.123c0,0.453-0.366,0.819-0.82,0.819H3.442c-0.453,0-0.82-0.366-0.82-0.819V8.976h14.754V15.123z M17.377,8.156H2.623V6.106c0-0.453,0.367-0.82,0.82-0.82h1.639v1.23c0,0.225,0.184,0.41,0.41,0.41c0.225,0,0.41-0.185,0.41-0.41v-1.23h8.196v1.23c0,0.225,0.185,0.41,0.41,0.41c0.227,0,0.409-0.185,0.409-0.41v-1.23h1.64c0.454,0,0.82,0.367,0.82,0.82V8.156z"></path>
                                  </svg>
                                  <input type="date" class="date-input" />
                              </div>
                              <button class="submit__btn">Submit</button>
                          </div>
                      </div>
                  </div>
              </div> -->
      </div>
    </div>
  </div>
</template>

<script>
// import paystack from 'vue-paystack';
import formatNaira from "format-to-naira";
import { mapState } from "vuex";
import Axios from "axios";
import Helper from "@/helpers/functions.js";

export default {
  name: "payment",
  // components: {
  //     paystack
  // },
  data() {
    return {
      showFilter: false,
      amount: null,
      full_name: null,
      email: null,
      paymentID: null,
      refundLoading: false,
      paymentdata: {
        history: [],
      },
      paymentTotal: 0,
      paymentLoading: false,
    };
  },
  computed: {
    ...mapState(["userData", "dataLoading", "walletBalance"]),
  },
  watch: {
    paymentID() {
      this.searchPayment();
    },
  },
  mounted() {
    // this.onMounted();
    this.getPayments();
  },
  methods: {
    searchPayment() {
      // let data = this.personnels;
    },
    styleBalance(value) {
      return value < 1 ? "text-danger" : "text-success";
    },
    async onMounted() {
      // await this.$store.dispatch('getUserData');
    },
    toNaira(value = 0) {
      return formatNaira(value);
    },
    async getPayments() {
      try {
        this.refundLoading = true;
        let auth = Helper.auth();

        let { data, status } = await Axios.get("school/get-payment", auth);
        this.refundLoading = false;

        if (status == 200) {
          // this.$store.dispatch("setUserData", data.data);
          // this.$bvModal.hide("refund-wallet");
          this.paymentdata = data.data;
          this.paymentTotal = this.paymentdata.requirements.reduce(
            (acc, cur) => {
              return acc + cur.amount;
            },
            0
          );
          console.log(this.paymentTotal);
        }
      } catch (error) {
        console.log(error);
        console.table(error);
      } finally {
        this.refundLoading = false;
      }
    },
    async makePayment(param) {
      try {
        this.paymentLoading = true;
        let auth = Helper.auth();

        let { data, status } = await Axios.post(
          "school/make-payment",
          {
            requirements: param,
          },
          auth
        );

        if (status == 200) {
          // this.$store.dispatch("setUserData", data.data);
          // this.$bvModal.hide("refund-wallet");
          this.paymentdata = data.data;
          console.log(this.paymentdata.requirements);
          if (this.paymentdata.requirements.length) {
            this.paymentTotal = this.paymentdata.requirements.reduce(
              (acc, cur) => {
                return acc + cur.amount;
              },
              0
            );
            console.log(this.paymentTotal);
          }
        }
      } catch (error) {
        console.log(error);
        console.table(error);
      } finally {
        this.paymentLoading = false;
      }
    },
  },
};
</script>

<style>
.payment__box {
  /* border: 1px dashed; */
  /* height: 300px; */
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f7f6fb;
}

.payment__form {
  /* width: 430px; */
  /* height: 90%; */
  padding: 36px 35px 35px 35px;
  border-radius: 50px;
  background: #f7f6fb;
  box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #ffffff;
}

.form__logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto;
  /* border: 1px solid; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* box-shadow: 0px 0px 2px #5f5f5f,
                0px 0px 0px 5px #ecf0f3, 8px 8px 15px #a7aaaf,
                -8px -8px 15px #ffffff; */
  box-shadow: 0px 0px 2px #f7f6fb, 0px 0px 0px 5px #f7f6fb, 8px 8px 15px #a7aaaf,
    -8px -8px 15px #ffffff;
}

.form__logo img {
  width: 50px;
  height: 50px;
}

.form__title {
  text-align: center;
  font-size: 28px;
  padding-top: 24px;
  letter-spacing: 3px;
}

.fields {
  width: 100%;
  padding: 75px 5px 5px 5px;
}

.fields > div {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.fields input,
.fields select {
  border: none;
  background: none;
  outline: none;
  font-size: 15px;
  color: #555;
  padding: 12px 10px 12px 12px;
  width: 100%;
}

.payment-input,
.amount-input,
.date-input {
  /* margin-bottom: 30px; */
  border-radius: 25px;
  box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #ffffff;
}

.fields svg {
  height: 22px;
  /* margin: 0 10px -3px 25px; */
  margin-right: 10px;
  display: inline;
}

.submit__btn {
  outline: none;
  border: none;
  cursor: pointer;
  width: 100%;
  height: 50px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  text-align: center;
  background: #24cfaa;
  margin-bottom: 0;
  box-shadow: 3px 3px 8px #b1b1b1, -3px -3px 8px #ffffff;
  transition: 0.5s;
}

.submit__btn:hover {
  background: #2fdbb6;
}

.submit__btn:active {
  background: #1da88a;
}

.payment__btn {
  background: #c6e6f3;
  padding: 6px 40px;
  border-radius: 25px;
  color: #0ea3e0;
}

.search__payment {
  padding: 6px 11px;
  background: #fff;
  border-radius: 12px;
}

.payment__bg {
  background-color: var(--first-color);
}

input,
input:active,
input:focus {
  outline: none;
  border: none;
}

.data_list {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-auto-rows: auto;
  gap: 1rem;
}
</style>
