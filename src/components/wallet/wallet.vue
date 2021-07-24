<template>
  <div class="w-full pl-2 mt-12">
    <!-- {{searchedWallet}} -->
    <b-row class="px-3 pt-10 items-center">
      <b-col>
        <!-- <i class="bx bxs-wallet text-3xl mr-2"></i> -->
        <h1 class="text-3xl m-0 font-bold">
          <i class="bx bx-wallet ml-2"></i> Wallet
        </h1>
      </b-col>
      <b-col cols="6">
        <input
          type="text"
          class="form-control"
          placeholder="Search for payment"
          v-model="walletSearch"
        />
      </b-col>
      <b-col>
        <b-btn size="sm" v-b-modal.fund-wallet>
          <i class="bx bx-plus"></i>
        </b-btn>
        <b-btn
          variant="warning"
          size="sm"
          v-b-modal.refund-wallet
          class="ml-3 text-white"
        >
          <i class="bx bx-refresh"></i>
        </b-btn>
      </b-col>
      <b-col>
        <span class="text-3xl" :class="styleBalance(userData.totalWallet)">{{
          toNaira(userData.totalWallet)
        }}</span>
      </b-col>
    </b-row>

    <div class="row pr-3">
      <hr class="w-full" />
    </div>

    <preloader v-if="dataLoading == true"></preloader>
    <div v-else class="row pr-4 py-3">
      <div
        v-if="userData === null"
        class="w-full flex items-center justify-center"
      >
        <h1 class="text-muted text-3xl">No User Data</h1>
      </div>
      <div v-else class="col-lg-12 col-12">
        <!-- <div class="mb-3 flex justify-end">
          <h1 class="p-3 bg-white shadow-md rounded-md text-xl mb-0">Balance - <span class="text-3xl" :class="styleBalance(walletBalance)">{{toNaira(walletBalance)}}</span></h1>
        </div> -->
        <!-- <div class="wallet_analytics grid grid-cols-3">
          <div class="data_item p-3 bg-white">
            
            <span class='text-sm font-semibold'>Balance </span>  
          </div>
          
        </div> -->
        <div v-for="(user, index) in mainSearchedWallet" :key="index">
          <b-row>
            <b-col>
              <div class="display-data bg-white">
                <b-row class="px-2">
                  <b-col>
                    <span class="text-lg text-capitalize">{{
                      toNaira(user.amount)
                    }}</span>
                  </b-col>
                  <b-col>
                    <div>
                      <span
                        v-if="user.credit"
                        class="
                          px-3
                          text-xs
                          mr-2
                          text-white
                          bg-green-200
                          rounded
                        "
                        >{{ user.credit ? "Credit" : "Debit" }}</span
                      >
                      <span
                        v-else
                        class="px-3 text-xs mr-2 text-white bg-red-200 rounded"
                        >{{ user.credit ? "Credit" : "Refund" }}</span
                      >
                    </div>
                  </b-col>
                  <b-col cols="2" class="flex items-center d-none d-md-flex">
                    <span class="tracking-wide text-gray-300 mr-3">{{
                      user.transaction_id
                    }}</span>
                  </b-col>
                  <b-col
                    cols="4"
                    class="flex items-center justify-end d-none d-md-flex"
                  >
                    <span class="tracking-wide">{{
                      formatDate(user.transaction_date)
                    }}</span>
                  </b-col>
                </b-row>
              </div>
            </b-col>
          </b-row>
        </div>

        <div class="row p-4" v-if="perpage < totalRows">
          <div class="col-md-12">
            <b-pagination
              v-model="currentpage"
              pills
              :per-page="perpage"
              :total-rows="totalRows"
            ></b-pagination>
          </div>
        </div>
        <!-- <div
          v-for="(user, index) in userData.wallet"
          :key="index"
          class="bg-white p-3 rounded-xl flex mb-3 flex-col shadow-md"
        >
          <div class="flex mb-1">
            <span
              :class="setCreditClass(user.credit)"
              class="wallet__type mr-2 rounded"
              >{{ user.credit ? "Credit" : "Debit" }}</span
            >
            <span class="tracking-wide font-bold">{{ user.amount }}</span>
          </div>
          <div class="flex">
            <span class="text-xs mr-3">{{
              formatDate(user.transaction_date)
            }}</span>
            <span class="text-xs">ID-{{ user.transaction_id }}</span>
          </div>
        </div> -->

        <!-- <div class="bg-white p-3 rounded-xl flex mb-3 flex-col shadow-md">
                    <div class="flex mb-1">
                        <span class="wallet__type mr-2 debit__type rounded-2xl">Debit</span>
                        <span class="tracking-wide font-bold">$40000</span>
                    </div>
                    <div class="flex">
                        <span class="text-xs mr-3">21/04/2021</span> 
                        <span class="text-xs">ID-23544322</span>
                    </div>
                </div> -->
      </div>
    </div>

    <b-modal
      id="fund-wallet"
      title="Make Payment"
      hide-header
      :hide-footer="true"
      :no-close-on-backdrop="false"
      centered
    >
      <div class="row">
        <div v-if="paymentOption == 'paystack'" class="col-12">
          <div class="form-group">
            <label for="amount">Enter Amount to Pay:</label>
            <input type="number" v-model="amount" class="form-control" />
          </div>

          <paystack
            ref="paystack"
            :amount="amount * 100"
            :email="userData.email"
            :paystackkey="PUBLIC_KEY"
            :reference="reference"
            :callback="processPayment"
            :close="close"
          >
            <button :disabled="!amount" class="btn btn-primary">Submit</button>
          </paystack>
          <button @click="paymentOption = null" class="ml-3 btn btn-danger">
            Back
          </button>
        </div>
        <div class="col-12" v-if="paymentOption == null">
          <div class="flex payment__options justify-evenly">
            <img
              @click="paymentOption = 'paystack'"
              class="mr-4 cursor-pointer"
              src="../../assets/img/paystack-logo-vector.svg"
              style="width: 130px"
              alt=""
            />
            <img
              class="cursor-pointer"
              src="../../assets/img/remita_logo.svg"
              style="width: 90px; transform: translateY(-7px)"
              alt=""
            />
          </div>
        </div>
      </div>
    </b-modal>
    <b-modal
      id="refund-wallet"
      title="Refund Payment"
      :hide-header="true"
      :hide-footer="true"
      :no-close-on-backdrop="false"
      centered
      @hidden="payment_id = null"
    >
      <div class="row px-2">
        <b-col>
          <input
            type="number"
            class="form-control"
            v-model="payment_id"
            placeholder="Enter Transaction ID"
          />
          <b-btn
            variant="danger"
            :disabled="refundLoading"
            @click.prevent="refundTransaction"
            v-show="payment_id"
            class="mt-3 w-100"
          >
            <span v-if="refundLoading">
              <b-spinner small></b-spinner> Please wait...</span
            >
            <span v-else>Refund</span>
          </b-btn>
        </b-col>
      </div>
    </b-modal>
  </div>
</template>

<script>
import paystack from "vue-paystack";
import Axios from "axios";
import Helper from "@/helpers/functions.js";
import { mapState } from "vuex";
import formatNaira from "format-to-naira";

export default {
  name: "wallet",
  components: {
    paystack,
  },
  data() {
    return {
      amount: null,
      full_name: "Chidi Michael",
      email: "megasanchez50@gmail.com",
      PUBLIC_KEY: "pk_test_e001bf8d80550c1fb799572fdd0713346f29abf3",
      paymentOption: null,
      ipAddress: null,
      // dataLoading: false,
      walletSearch: null,
      searchedWallet: [],
      mainSearchedWallet: [],
      perpage: 8,
      currentpage: 1,
      totalRows: 0,
      payment_id: null,
      refundLoading: false,
      // walletBalance: 0
    };
  },

  computed: {
    reference() {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 10; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    },
    ...mapState(["userData", "dataLoading", "walletBalance"]),
  },
  mounted() {
    this.onMounted();
  },
  watch: {
    search: {
      deep: true,
      handler() {
        this.currentpage = 1;
      },
    },
    walletSearch() {
      this.searchWallet();
    },
    currentpage() {
      this.paginate();
    },
    perpage() {
      this.currentpage = 1;
      this.paginate();
    },
    userData() {
      if (this.userData.wallet.length) {
        this.totalRows = this.userData.wallet.length;
        this.searchedWallet = this.userData.wallet.reverse();
        // this.calculateBalance()
        this.paginate();
      }
    },
  },

  methods: {
    async processPayment(response) {
      if (response.status === "success") {
        try {
          let body = {
            reference: response.reference,
            transaction_id: response.transaction,
          };

          let auth = Helper.auth();
          let { data, status } = await Axios.post(
            "school/payment-verify",
            body,
            auth
          );
          this.$bvModal.hide("fund-wallet");
          if (status == 200) {
            this.$store.dispatch("setUserData", data.data);
            Helper.toast(
              data.message,
              "Payment has been verified",
              `Welcome`,
              5000,
              "app"
            );
          }
        } catch (error) {
          console.log(error);
          console.table(error);
        }
      }
    },

    async checkIP() {
      try {
        let { data, status } = await Axios.get(
          "https://api.ipify.org?format=json"
        );
        if (status == 200) {
          this.ipAddress = data.ip;
        }
      } catch (error) {
        console.log(error);
      }
    },

    close() {
      console.log(this.$refs);
    },

    async onMounted() {
      await this.$store.dispatch("getUserData");

      await this.checkIP();
    },

    async refundTransaction() {
      try {
        this.refundLoading = true;
        let auth = Helper.auth();

        let { data, status } = await Axios.post(
          "school/refund-payment",
          { transaction_id: this.payment_id },
          auth
        );

        if (status == 200) {
          this.$store.dispatch("setUserData", data.data);
          this.$bvModal.hide("refund-wallet");
        }
      } catch (error) {
        console.log(error);
        console.table(error);
      } finally {
        this.refundLoading = false;
      }
    },

    // calculateBalance(){
    //   let debit = this.searchedWallet.filter(item => item.credit !== true )
    //   let credit = this.searchedWallet.filter(item => item.credit === true )

    //   let debitBalance = debit.reduce((acc, curr) => {
    //     return parseInt(acc) + parseInt(curr.amount)
    //   }, 0);

    //   let creditBalance = credit.reduce((acc, curr) => {
    //     return parseInt(acc) + parseInt(curr.amount)
    //   }, 0);
    //   let balance = creditBalance - debitBalance;
    //   this.walletBalance = balance;
    // },

    setCreditClass(credit) {
      return credit ? "credit__type" : "debit__type";
    },

    toNaira(value) {
      return formatNaira(value);
    },

    formatDate(date) {
      return Helper.formatDate(date);
    },

    setCreditClass(credit) {
      return credit ? "credit__type" : "debit__type";
    },

    formatDate(date) {
      return Helper.formatDate(date);
    },

    styleBalance(value) {
      return value < 1 ? "text-danger" : "text-success";
    },

    searchWallet() {
      let data = this.userData.wallet;
      if (this.walletSearch) {
        data = data.filter((item) => {
          let result;
          let regex = new RegExp(this.walletSearch, "i");
          result =
            regex.test(item._id) ||
            regex.test(item.reference) ||
            regex.test(item.transaction_id);
          return result;
        });
        this.totalRows = data.length;
        this.searchedWallet = data;
        this.paginate();
      } else {
        return [];
      }
    },
    paginate() {
      let start = parseInt((this.currentpage - 1) * this.perpage);
      let end = parseInt((this.currentpage - 1) * this.perpage + this.perpage);
      this.mainSearchedWallet = this.searchedWallet.slice(start, end);
    },
    // reset(){
    //   let start = parseInt((this.currentpage - 1) * this.perpage);
    //   let end = parseInt((this.currentpage - 1) * this.perpage + this.perpage);
    //   this.mainSearchedWallet = this.userData.wallet.slice(0, end);
    // }
  },
};
</script>

<style>
.wallet__type {
  padding: 2px 20px;
  text-align: center;
  font-size: 11px;
  color: #fff;
  display: flex;
  align-items: center;
}

.credit__type {
  background: #5bd67b;
}
.debit__type {
  background: #d65b5b;
}

.payment__options {
  width: 100%;
  margin: 0 auto;
}
</style>