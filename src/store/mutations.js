import router from "../router/index";
export default {
  LOGOUT(state) {
    state.student_token = null;
    localStorage.clear();
    router.push({ path: "/login" });
  },
  SET_USER_DATA(state, payload) {
    state.userData = payload.data;
  },
  DATA_LOADING(state, payload) {
    state.dataLoading = payload;
  },
  SET_WALLET_BALANCE(state) {
    let debit = state.userData.wallet.filter((item) => item.credit !== true);
    let credit = state.userData.wallet.filter((item) => item.credit === true);

    let creditBalance = credit.reduce((acc, curr) => {
      return parseInt(acc) + parseInt(curr.amount);
    }, 0);
    state.walletBalance = creditBalance - debitBalance;
  },

  ASSIGNMENT_LOADING(state) {},
  SET_ASSIGNMENTS(state) {},
};
